# Umeli basic-service launch checklist

## Launch objective

Publish a fast, public information page that explains Umeli and the planned Limpopo pilot without collecting personal or property information.

## Product requirements

- One clear purpose per section.
- Plain South African English and short sentences.
- Large touch targets and visible keyboard focus.
- No account required for public information.
- No map, web font, video, tracking script or large image on initial load.
- No claim that Umeli proves ownership, title or legal validity.
- No inactive control presented as a working service.

## Low-bandwidth rules

- Render the launch page on the server as static content.
- Keep essential information usable without client-side JavaScript.
- Add maps and photographs only after a user requests them.
- Compress future seller photographs before upload where technically safe.
- Preserve forms locally or as drafts during unstable connections in later phases.
- Establish and test a page-weight budget before adding third-party services.

## Registration and deployment

- Create or confirm a GitHub account controlled by the project owner.
- Create a private `umeli` repository initially.
- Review the complete local file list before the first commit.
- Obtain explicit approval to stage, commit and push the project.
- Create or confirm a Vercel account controlled by the project owner.
- Import the GitHub repository into v0/Vercel.
- Use a free plan until a paid feature is deliberately approved.
- Confirm the South African privacy and hosting implications before adding personal data.
- Do not add Supabase production credentials during this public information launch.

## Verification before publication

- Run linting, type-checking, tests and production build.
- Verify `/health` returns HTTP 200.
- Test at narrow mobile widths and with keyboard navigation.
- Test with network throttling and JavaScript disabled.
- Confirm that no secret or `.env.local` file is tracked.
- Record the live URL and responsible account owner.

## Deferred until an approved later phase

- Registration and login.
- Seller property submissions.
- GPS or exact property-coordinate collection.
- Identity documents and selfies.
- Traditional-authority approvals.
- Buyer enquiries and payments.
