# Repository Analysis & Code Quality Report

**Repository**: Trump Tweet & S&P 500 Market Predictor
**Date**: 2026-01-10
**Team**: Drew Gilmore, Elisa Gipe, Jay Sueno, Patrick Plaisted

---

## Executive Summary

This is a full-stack data science web application that analyzes the correlation between President Trump's tweet sentiment (2016-2020) and S&P 500 market movements. The project demonstrates a complete ML pipeline from data collection through web visualization.

**Tech Stack**: Python 3.8.3, Flask, Pandas, Scikit-learn, Tableau, Plotly, Bootstrap
**Best Model**: Random Forest (56% test accuracy, 87% training accuracy)
**Key Finding**: 10% accuracy improvement when filtering tweets to market-related keywords

---

## What This Repository Does

### Core Functionality
1. **Data Processing**: ETL pipeline for Trump's tweets (15.7MB JSON) and S&P 500 market data
2. **Sentiment Analysis**: Uses Hedonometer word database (10,000+ words, 1-9 happiness scale) to score tweets
3. **Machine Learning**: Tests Random Forest, K-NN, and Neural Network models to predict market movement
4. **Web Visualization**: Flask app with interactive Tableau/Plotly dashboards and light/dark theme toggle

### Languages & Technologies

| Category | Technologies |
|----------|-------------|
| **Backend** | Python 3.8.3, Flask 1.1.1, SQLAlchemy 1.3.11, Gunicorn 20.0.0 |
| **Frontend** | HTML5, CSS3, JavaScript, Bootstrap 4.3.1 |
| **Data Science** | Pandas, NumPy, Scikit-learn, Jupyter Notebooks |
| **Visualization** | Tableau API, Plotly.js |
| **Deployment** | Heroku |

---

## Code Quality Assessment

### Strengths ✅

1. **Clean Project Structure**: Well-organized separation of concerns (templates, static, notebooks, data)
2. **Good Documentation**: Comprehensive README with methodology and findings
3. **Responsive Design**: Bootstrap integration with custom light/dark theme
4. **Complete ML Pipeline**: From raw data → cleaning → feature selection → modeling → evaluation
5. **Version Control**: Active git history with meaningful commits
6. **Production-Ready**: Heroku deployment with proper config files (Procfile, runtime.txt)

### Critical Issues ⚠️

#### 1. **Security Vulnerabilities** (HIGH PRIORITY)

**Issue**: No security measures in Flask app
- No CSRF protection
- No input validation
- No rate limiting
- No security headers
- SQLAlchemy imported but not used (dead code)

**Risk**: Production deployment without basic security is dangerous

#### 2. **Outdated Dependencies** (HIGH PRIORITY)

**Current versions** (from requirements.txt):
```
Flask>=1.1.1          # Released 2019 - CRITICAL CVEs fixed in newer versions
Jinja2>=2.10.3        # Released 2019 - Known XSS vulnerabilities
SQLAlchemy>=1.3.11    # Released 2019
```

**Security concerns**:
- Flask 1.1.1 has known security vulnerabilities (CVE-2023-30861, CVE-2023-25577)
- Jinja2 2.10.3 has XSS vulnerabilities (CVE-2024-22195, CVE-2020-28493)
- Python 3.8.3 reached EOL in October 2024

**Risk**: Exposed to known exploits

#### 3. **Unused Dependencies**

- `SQLAlchemy` and `flask_sqlalchemy` imported in requirements.txt but never used
- No database in the application
- Adds unnecessary attack surface

#### 4. **Machine Learning Code Quality Issues**

From `/Notebooks/jay_ml_random_forest.ipynb`:

**Problems**:
- Hardcoded random_state values (reduces reproducibility)
- No cross-validation (only train/test split)
- Overfitting evident (87% train vs 56% test)
- Commented-out code left in cells
- No model versioning or experiment tracking
- GridSearchCV results not used in final model
- Lack of error handling

**Example** (cell 17):
```python
clf = RandomForestClassifier(n_estimators=10, bootstrap=True, max_depth=10, min_samples_split=8)
# Training: 87%, Testing: 54% - clear overfitting
```

#### 5. **Frontend Code Issues**

**CSS** (`style.css`):
- Magic numbers without comments (line 90: `.tensix { width: 1016px !important; }`)
- Overuse of `!important` flags (9 instances)
- Mixed units (px, %, auto) without clear system
- External image URLs for theme toggle (line 160, 177) - breaks offline
- Hardcoded colors instead of CSS variables in some places

**JavaScript** (`script.js`):
- Commented-out dead code (lines 2-5)
- No error handling for localStorage failures
- No feature detection for localStorage support
- Theme toggle checkbox not bound in code (relies on HTML)

#### 6. **Code Duplication**

- Multiple similar Jupyter notebooks (`jay_ml_random_forest.ipynb` vs `jay_ml_random_forest_v2.ipynb`)
- Similar ETL logic across notebooks
- Repeated data loading patterns

#### 7. **Missing Best Practices**

- No `.gitignore` file (risk of committing sensitive data)
- No automated tests
- No linting/formatting configuration
- No CI/CD pipeline
- No error logging
- No environment variable configuration (.env)
- 60MB model file in repo (should use Git LFS)
- No API documentation
- No contribution guidelines

---

## Improvement Recommendations

### Priority 1: Security & Dependencies (IMMEDIATE)

1. **Update all dependencies**:
```txt
Flask==3.0.0
Jinja2==3.1.2
gunicorn==21.2.0
python-dotenv==1.0.0  # NEW - for environment variables
```

2. **Update Python runtime**:
```txt
python-3.11.7  # or python-3.12.x
```

3. **Add security measures to Flask app**:
```python
from flask import Flask
from flask_talisman import Talisman  # Security headers
from flask_limiter import Limiter    # Rate limiting

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

# Add security headers
Talisman(app, content_security_policy=None)

# Add rate limiting
limiter = Limiter(app, key_func=get_remote_address)
```

4. **Remove unused dependencies**:
- Delete SQLAlchemy and flask_sqlalchemy from requirements.txt

5. **Create `.gitignore`**:
```
__pycache__/
*.py[cod]
.env
.venv/
venv/
*.ipynb_checkpoints/
*.h5  # Move large models to Git LFS
.DS_Store
```

### Priority 2: Code Quality Improvements

#### Flask Application (`app.py`)

**Current** (28 lines):
```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
```

**Improved**:
```python
import os
from flask import Flask, render_template, abort
import logging

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        logger.error(f"Error rendering index: {e}")
        abort(500)

@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=os.environ.get('FLASK_DEBUG', False))
```

#### JavaScript Improvements

**Current** (`script.js`):
```javascript
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
```

**Improved**:
```javascript
// Feature detection and error handling
function setTheme(themeName) {
    try {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('theme', themeName);
            document.documentElement.className = themeName;
        } else {
            console.warn('localStorage not supported');
            document.documentElement.className = themeName;
        }
    } catch (error) {
        console.error('Error setting theme:', error);
    }
}

// Remove commented-out code (lines 2-5)
```

#### CSS Improvements

**Issues to fix**:
1. Remove magic number `1016px` - make responsive:
```css
/* BEFORE */
.tensix {
  width: 1016px !important;
}

/* AFTER */
.tensix {
  width: 100%;
  max-width: 1016px;
  margin: 0 auto;
}
```

2. Reduce `!important` usage - fix specificity instead
3. Use CSS variables consistently for all colors
4. Self-host theme toggle images instead of external URLs

#### Machine Learning Improvements

1. **Add proper cross-validation**:
```python
from sklearn.model_selection import cross_val_score, StratifiedKFold

# Use stratified k-fold for imbalanced datasets
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(clf, X_train_scaled, y_train, cv=cv, scoring='accuracy')
print(f"CV Accuracy: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})")
```

2. **Add experiment tracking** (MLflow or Weights & Biases):
```python
import mlflow

mlflow.start_run()
mlflow.log_params({
    'n_estimators': 100,
    'max_depth': 3,
    'min_samples_split': 8
})
mlflow.log_metrics({
    'train_accuracy': train_acc,
    'test_accuracy': test_acc
})
mlflow.sklearn.log_model(clf, "model")
mlflow.end_run()
```

3. **Add model evaluation**:
```python
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns

y_pred = clf.predict(X_test_scaled)
print(classification_report(y_test, y_pred))

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d')
```

4. **Handle class imbalance**:
```python
from sklearn.utils.class_weight import compute_class_weight

# Calculate class weights
class_weights = compute_class_weight('balanced',
                                     classes=np.unique(y_train),
                                     y=y_train)

clf = RandomForestClassifier(
    class_weight='balanced',  # Add this
    n_estimators=100,
    max_depth=3
)
```

### Priority 3: DevOps & Maintainability

1. **Add automated testing**:
```python
# tests/test_app.py
import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_index(client):
    response = client.get('/')
    assert response.status_code == 200

def test_404(client):
    response = client.get('/nonexistent')
    assert response.status_code == 404
```

2. **Add linting configuration** (`.flake8`, `pyproject.toml`):
```ini
[flake8]
max-line-length = 100
exclude = .git,__pycache__,venv
```

3. **Add pre-commit hooks** (`.pre-commit-config.yaml`):
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.12.1
    hooks:
      - id: black
  - repo: https://github.com/pycqa/flake8
    rev: 7.0.0
    hooks:
      - id: flake8
```

4. **Environment configuration**:
```python
# config.py
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    DEBUG = False
    TESTING = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    # Add production-specific settings
```

5. **Use Git LFS for large files**:
```bash
git lfs track "*.h5"
git lfs track "*.csv"
git add .gitattributes
```

### Priority 4: Documentation

1. **Add API documentation** (if creating endpoints)
2. **Add docstrings to Python functions**
3. **Create CONTRIBUTING.md**
4. **Add inline comments for complex logic**
5. **Document data schema and feature definitions**

### Priority 5: Performance Optimizations

1. **Minify CSS/JS for production**
2. **Add caching headers** for static assets
3. **Compress large JSON/CSV files** (use gzip)
4. **Lazy load images** in gallery
5. **Add CDN** for Bootstrap/Plotly instead of local copies

---

## Specific File Recommendations

### Files to Create

| File | Purpose |
|------|---------|
| `.gitignore` | Prevent committing sensitive files |
| `.env.example` | Template for environment variables |
| `config.py` | Centralized configuration |
| `tests/test_app.py` | Unit tests for Flask routes |
| `CONTRIBUTING.md` | Development guidelines |
| `.flake8` | Linting rules |
| `docker-compose.yml` | Local development environment |
| `404.html`, `500.html` | Error page templates |

### Files to Refactor

| File | Issues | Recommendation |
|------|--------|----------------|
| `app.py` | Missing error handling, logging | Add try/except, error handlers, logging |
| `requirements.txt` | Outdated, unused deps | Update versions, remove SQLAlchemy |
| `runtime.txt` | Python 3.8.3 (EOL) | Update to Python 3.11+ |
| `style.css` | Overuse of !important, magic numbers | Refactor specificity, use variables |
| `script.js` | No error handling | Add feature detection, try/catch |
| All notebooks | Code duplication | Extract common functions to utils.py |

### Files to Delete

- `jay_ml_*_v2.ipynb` (duplicates - consolidate into v1 or create final notebook)
- Commented-out code in all notebooks
- Unused images in `/static/Images/` (if any)

---

## Architecture Recommendations

### Current Architecture
```
Client → Flask (static pages) → Templates (with embedded Tableau/Plotly)
                              → Static files
```

**Issues**:
- No data layer (yet imports SQLAlchemy)
- All processing in notebooks (not integrated into app)
- No API endpoints for dynamic data

### Recommended Architecture

For future enhancements:

```
Client → Flask API → Service Layer → Data Layer
         ↓           ↓                ↓
      Templates   Business Logic   CSV/Database
                  (ML inference)   (Cached results)
```

**Benefits**:
- Separation of concerns
- Testable business logic
- API endpoints for dynamic predictions
- Cacheable ML results

---

## Technical Debt Summary

| Category | Severity | Items | Estimated Effort |
|----------|----------|-------|------------------|
| Security | High | 4 | 2-3 days |
| Dependencies | High | 3 | 1 day |
| Code Quality | Medium | 8 | 3-4 days |
| Testing | Medium | 5 | 2-3 days |
| Documentation | Low | 4 | 1-2 days |
| Performance | Low | 3 | 1 day |
| **TOTAL** | | **27** | **10-14 days** |

---

## Positive Highlights

Despite the areas for improvement, this project has notable strengths:

1. **Complete End-to-End Pipeline**: Rare to see a project go from raw data to deployed web app
2. **Good Documentation**: README is comprehensive and well-structured
3. **Real-World Problem**: Interesting hypothesis with practical implications
4. **Clean UI**: Theme toggle and responsive design show attention to UX
5. **Multiple ML Approaches**: Testing various algorithms shows good scientific method
6. **Feature Engineering**: Sentiment analysis with Hedonometer shows creativity
7. **Production Deployment**: Actually deployed to Heroku (many projects never make it)

---

## Conclusion

This is a **solid educational/portfolio project** that demonstrates full-stack data science capabilities. The main concerns are **security vulnerabilities from outdated dependencies** and **ML overfitting**.

**Recommended Action Plan**:
1. Week 1: Update dependencies, add security measures
2. Week 2: Refactor ML code, add cross-validation, reduce overfitting
3. Week 3: Add tests, improve error handling
4. Week 4: Documentation and performance optimizations

**Overall Grade**: B+ (Would be A- with security updates)

**Best Use Case**: Portfolio piece for data science/full-stack roles, educational reference for ML sentiment analysis

---

*Generated by Claude Code - 2026-01-10*
