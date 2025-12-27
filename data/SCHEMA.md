# 📊 Data Schema

This document defines the format for university data.

---

## University Format (universities.json)

```json
{
  "code": "string (required, unique)",
  "name": "string (required)",
  "region": "string (required)",
  "website": "string (required, URL)",
  "entry_paths": {
    "waec": boolean,
    "neco": boolean,
    "hnd": boolean,
    "alevel": boolean
  },
  "international_fee_band": "low|medium|high (optional)",
  "courses": [
    {
      "name": "string",
      "level": "bachelor|masters|phd"
    }
  ],
  "notes": "string (optional)"
}
```

---

## Required Fields

- `code` - Unique identifier (lowercase, underscores)
- `name` - Official university name
- `region` - City/state/territory
- `website` - Official URL
- `entry_paths` - Which qualifications accepted
- `courses` - At least 3 programs

---

## Example

```json
{
  "code": "university_tasmania",
  "name": "University of Tasmania",
  "region": "Tasmania",
  "website": "https://www.utas.edu.au",
  "entry_paths": {
    "waec": true,
    "neco": true,
    "hnd": true,
    "alevel": true
  },
  "international_fee_band": "low",
  "courses": [
    {
      "name": "Computer Science",
      "level": "bachelor"
    },
    {
      "name": "Engineering",
      "level": "bachelor"
    },
    {
      "name": "Business",
      "level": "masters"
    }
  ],
  "notes": "Regional university with 25% automatic scholarship"
}
```

---

## Validation

- JSON must be valid
- All required fields present
- URLs start with https://
- Codes are unique
- Boolean values are true/false (not "yes"/"no")

Test your JSON: https://jsonlint.com/

---

**Questions?** See [CONTRIBUTING.md](../CONTRIBUTING.md)
