"use client";

import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

interface LocationSearchFormProps {
  defaultValue?: string;
  compact?: boolean;
}

interface LocationSuggestion {
  id: string;
  name: string;
  typeLabel: string;
  context: string;
  href: string;
}

function isSuggestion(value: unknown): value is LocationSuggestion {
  if (!value || typeof value !== "object") return false;
  const suggestion = value as Record<string, unknown>;
  return (
    typeof suggestion.id === "string" &&
    typeof suggestion.name === "string" &&
    typeof suggestion.typeLabel === "string" &&
    typeof suggestion.context === "string" &&
    typeof suggestion.href === "string" &&
    suggestion.href.startsWith("/properties?q=")
  );
}

function parseSuggestions(value: unknown): LocationSuggestion[] {
  if (!value || typeof value !== "object") return [];
  const suggestions = (value as Record<string, unknown>).suggestions;
  return Array.isArray(suggestions)
    ? suggestions.filter(isSuggestion).slice(0, 8)
    : [];
}

export function LocationSearchForm({
  defaultValue = "",
  compact = false,
}: LocationSearchFormProps) {
  const inputId = compact ? "home-location-query" : "location-query";
  const listboxId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/locations/suggestions?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          setSuggestions([]);
          return;
        }
        const nextSuggestions = parseSuggestions(await response.json());
        setSuggestions(nextSuggestions);
        setActiveIndex(-1);
        setIsOpen(nextSuggestions.length > 0);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    setSuggestions([]);
    setActiveIndex(-1);
    setIsOpen(false);
    setIsLoading(nextQuery.trim().length >= 2);
  }

  function submitSuggestion(suggestion: LocationSuggestion) {
    setQuery(suggestion.name);
    setIsOpen(false);
    if (inputRef.current) inputRef.current.value = suggestion.name;
    formRef.current?.requestSubmit();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) =>
        current >= suggestions.length - 1 ? 0 : current + 1,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1,
      );
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const suggestion = suggestions[activeIndex];
      if (suggestion) submitSuggestion(suggestion);
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <form
      action="/properties"
      className={compact ? "location-search compact-search" : "location-search"}
      method="get"
      ref={formRef}
      role="search"
    >
      <label htmlFor={inputId}>Search the national area directory</label>
      <div className="predictive-search">
        <div className="search-controls">
          <input
            aria-activedescendant={
              activeIndex >= 0
                ? `${listboxId}-option-${activeIndex}`
                : undefined
            }
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={isOpen}
            autoComplete="off"
            id={inputId}
            maxLength={80}
            minLength={2}
            name="q"
            onChange={handleChange}
            onFocus={() => setIsOpen(suggestions.length > 0)}
            onKeyDown={handleKeyDown}
            placeholder="Village, town, ward or municipality"
            ref={inputRef}
            required
            role="combobox"
            type="search"
            value={query}
          />
          <button className="button button-primary" type="submit">
            Search areas
          </button>
        </div>

        {isOpen ? (
          <ul
            aria-label="Suggested areas"
            className="location-suggestions"
            id={listboxId}
            role="listbox"
          >
            {suggestions.map((suggestion, index) => (
              <li
                aria-selected={index === activeIndex}
                className={index === activeIndex ? "active" : undefined}
                id={`${listboxId}-option-${index}`}
                key={suggestion.id}
                role="option"
              >
                <a href={suggestion.href}>
                  <strong>{suggestion.name}</strong>
                  <span>{suggestion.typeLabel}</span>
                  {suggestion.context ? (
                    <small>{suggestion.context}</small>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <p aria-live="polite" className="search-help">
        {isLoading
          ? "Finding matching areas…"
          : "Start typing for suggestions, or try Giyani, Homu, Mhinga, Nkuzana or Diepsloot."}
      </p>
    </form>
  );
}
