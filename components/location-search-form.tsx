interface LocationSearchFormProps {
  defaultValue?: string;
  compact?: boolean;
}

export function LocationSearchForm({
  defaultValue = "",
  compact = false,
}: LocationSearchFormProps) {
  return (
    <form
      action="/properties"
      className={compact ? "location-search compact-search" : "location-search"}
      method="get"
      role="search"
    >
      <label htmlFor={compact ? "home-location-query" : "location-query"}>
        Search the national area directory
      </label>
      <div className="search-controls">
        <input
          autoComplete="off"
          defaultValue={defaultValue}
          id={compact ? "home-location-query" : "location-query"}
          maxLength={80}
          minLength={2}
          name="q"
          placeholder="Village, town, ward or municipality"
          required
          type="search"
        />
        <button className="button button-primary" type="submit">
          Search areas
        </button>
      </div>
      <p className="search-help">
        Try Giyani, Homu, Mhinga, Nkuzana or Diepsloot.
      </p>
    </form>
  );
}
