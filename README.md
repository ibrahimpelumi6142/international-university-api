# 🎓 International University API

> Professional university data API for international students across UK, USA, Canada, and Australia.

[![API Status](https://img.shields.io/badge/API-Live-success)](https://api.worqnow.ai/health)
[![Universities](https://img.shields.io/badge/Universities-200+-blue)](https://api.worqnow.ai/info)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Live API:** https://api.worqnow.ai  
**Interactive Docs:** https://api.worqnow.ai/docs  
**GitHub:** https://github.com/worqnow/international-university-api

---

## 🚀 Quick Start

```javascript
// Get all Australian universities
fetch('https://api.worqnow.ai/education/au/universities')
  .then(res => res.json())
  .then(data => {
    console.log(`Found ${data.count} universities`);
    console.log(data.data);
  });
```

```python
# Python example
import requests

response = requests.get('https://api.worqnow.ai/education/ca/universities')
data = response.json()

print(f"Found {data['count']} universities")
for uni in data['data']:
    print(f"- {uni['name']} ({uni['region']})")
```

**See more examples:** [examples/](examples/)

---

## 📊 What's Included

- **196 Universities** across 4 countries
- **320+ Scholarship programs** with values and eligibility
- **Complete tuition fees** in local currencies
- **Visa guidance** with work rights and post-study options
- **Entry requirements** including WAEC, NECO, A-Levels
- **100% WAEC/NECO acceptance** data

## 🌍 Country Coverage

| Country | Universities | Key Highlights |
|---------|--------------|----------------|
| 🇦🇺 Australia | 51 | **UNLIMITED work hours** • 2-6 years post-study visa |
| 🇨🇦 Canada | 50 | **Most affordable** (CAD $11K+) • 3-year PGWP |
| 🇺🇸 USA | 55 | **36 months STEM OPT** • World-class programs |
| 🇬🇧 UK | 53 | **3-year bachelor's** • 2-year Graduate Route |
| 🇩🇪 Germany | 50 | **💰 FREE Tuition (€0)!** • 18-Month Post-Study Visa |
| 🇳🇱 Netherlands | 42 | **🚴 2,100+ English** • Programs! FREE Public Transport! |
| 🇮🇪 Ireland | 15 | **Access + English!** • 2-Year Post-Study Visa |
---

## 📡 API Endpoints

### Global Reference Data
```
GET /global/degree-levels          - All degree levels
GET /global/english-tests          - Accepted English tests  
GET /global/qualification-types    - All qualification types
```

### Per Country (uk, usa, ca, au)
```
GET /education/{country}/universities        - All universities with filters
GET /education/{country}/tuition             - Tuition information
GET /education/{country}/scholarships        - Scholarship programs
GET /education/{country}/visa-guidance       - Visa requirements
GET /education/{country}/entry-requirements  - Admission requirements
GET /education/{country}/statistics          - Country statistics
```

**Full API documentation:** https://api.worqnow.ai/docs

---

## 🔍 Filtering Examples

### Australia
```bash
# Regional universities with scholarships
curl "https://api.worqnow.ai/education/au/universities?is_regional=true&has_scholarship=true"

# Group of Eight universities
curl "https://api.worqnow.ai/education/au/universities?is_go8=true"
```

### Canada
```bash
# Universities in Ontario with PNP
curl "https://api.worqnow.ai/education/ca/universities?province=Ontario&has_pnp=true"

# Most affordable options
curl "https://api.worqnow.ai/education/ca/universities?fee_band=low"
```

### USA
```bash
# STEM OPT eligible universities
curl "https://api.worqnow.ai/education/usa/universities?is_stem_opt_eligible=true"
```

### UK
```bash
# Russell Group universities
curl "https://api.worqnow.ai/education/uk/universities?is_russell_group=true"
```

---

## 💻 Code Examples

Complete working examples in multiple languages:

- **[JavaScript](examples/javascript/)** - Fetch API, async/await
- **[Python](examples/python/)** - Requests library
- **[React](examples/react/)** - Full university search component

**Want to add examples in PHP, Ruby, Go?** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🤝 Contributing

We welcome contributions!

### 📊 Add University Data
- Add new universities
- Update tuition fees
- Add scholarship programs

### 💻 Add Code Examples
- New programming languages
- Framework integrations

### 🐛 Report Issues
- Incorrect data
- API bugs

**See detailed guide:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📁 Repository Structure

```
international-university-api/
├── README.md                 # This file
├── CONTRIBUTING.md           # Contribution guide
├── LICENSE                   # MIT + CC BY 4.0
├── data/                     # University data
│   ├── SCHEMA.md            # Data format guide
│   ├── uk/
│   ├── usa/
│   ├── ca/
│   └── au/
├── examples/                 # Code examples
│   ├── javascript/
│   ├── python/
│   └── react/
└── .github/
    └── ISSUE_TEMPLATE/       # Bug & feature templates
```

---

## 🌟 Country Highlights

### 🇦🇺 Australia
- **UNLIMITED work hours** while studying
- **2-6 years post-study work visa** (longest globally)
- Regional bonuses for extra visa years
- Strong PR pathways

### 🇨🇦 Canada
- **Cheapest:** Memorial University (CAD $11,460/year)
- **3-year Post-Graduation Work Permit**
- Provincial Nominee Programs
- Excellent quality of life

### 🇺🇸 USA
- **36 months STEM OPT** (12 + 24 extension)
- World-class universities
- Diverse program offerings

### 🇬🇧 UK
- **3-year bachelor's** (faster completion)
- **2-year Graduate Route** visa
- 24 Russell Group universities

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/ibrahimpelumi6142/international-university-api/issues)
- **Email:** support@worqnow.ai
- **Documentation:** https://api.worqnow.ai/docs

---

## 📄 License

- **Code Examples:** MIT License
- **University Data:** CC BY 4.0
- **API Access:** [Terms of Service](https://worqnow.ai/terms)

See [LICENSE](LICENSE) for details.

---

## ⭐ Star This Repository!

If this API helps you, please star this repository!

---

**Built with ❤️ by Ibrahim Lasisi**
