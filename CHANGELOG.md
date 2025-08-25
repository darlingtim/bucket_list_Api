# Changelog

## [v1.1.0] - 2025-08-25
### 🚀 New Features
- **Swagger Documentation**: Added `swagger-jsdoc` and `swagger-ui-express` to auto-generate API documentation.  
- **API Documentation**: Created and linked a standalone API documentation file to the README for easy navigation.  

### 🛠 Fixes
- **Query Handling**: Removed incorrect usage of `express.query`, which previously caused errors.  
- **API Docs Linkage**: Fixed broken linkage between the README and API documentation.  

### 📖 Documentation
- Updated README with references to API docs.  
- Added initial `CHANGELOG.md`.  

### ⚙️ Chores / Maintenance
- Added GitHub Actions CI workflow to run tests on push.  
- Added Jest + Supertest setup for unit and integration testing.  
- Configured Jest with proper test settings.  
- Temporarily commented out a failing test pending resolution.  

---

## [v1.0.0] - 2019-03-14
### 🎉 Initial Release
- First commit with bucketlist API setup.  
- Added authentication and basic routing.  
- Basic project scaffolding.  

