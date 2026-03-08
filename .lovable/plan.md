

## Plan: Update Planetary Data to Latest Space Agency Information

Based on research of the latest data from NASA, ESA, JAXA, and other sources (as of early 2026), the following updates are needed in `src/data/planetsData.ts`:

### Moon Count Updates
- **Jupiter**: 95 → 97 (confirmed 2025). Also update the fact "Jupiter has 95 known moons" → "97"
- **Saturn**: 146 → 274 (128 new moons officially confirmed, March 2025 per Sky & Telescope / Scientific American)
- **Uranus**: 28 → 29 (S/2025 U1 discovered by JWST, August 2025)
- Neptune: stays at 16 (no change confirmed)

### Mission Status Updates

**Mercury — BepiColombo**
- `endYear`: "2025" → "2026" (orbital insertion now expected late 2026 after 6th flyby in Jan 2025)
- Update achievements text to reflect the revised timeline

**Mars — Mars Sample Return**
- Mission was **canceled by Congress** in January 2026. Change status from `"upcoming"` to `"completed"` with a note it was canceled, or remove entirely. Best approach: keep the entry but change status/description to reflect cancellation.

**Mars — Curiosity**
- Achievement "Still operating after 12 years" → "Still operating after 14 years"

**Jupiter — Europa Clipper**
- Already shows year 2024 and status "active" which is correct (launched Oct 14, 2024)
- Update achievements to note Mars gravity assist completed (March 2025), arrival April 2030

**Saturn — Dragonfly**
- Year: "2034" → "2028" (confirmed launch 2028, arrival at Titan 2034)
- Update description to include arrival date

**Venus — DAVINCI**
- Year stays "2031" but update to "early 2030s" per latest NASA info (no firm date)

### Technical Details
All changes are in a single file: `src/data/planetsData.ts`. The `PlanetCard` component and `PlanetDetail` page read from this data, so all cards and detail views will automatically reflect the updates. No interface changes needed — the `Mission` interface already has `status` field that can represent canceled missions (we'll use `"completed"` with updated description text since there's no `"canceled"` status value).

### Estimated Scope
~15 targeted line edits across the planets data file. No structural or component changes required.

