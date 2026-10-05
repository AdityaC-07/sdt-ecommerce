# E2E Testing Documentation

This document provides an overview of end-to-end (E2E) testing for the CartIQ application. 

## Overview

E2E testing ensures that the entire application works correctly from the user's perspective by testing the complete flow of the application, including frontend, backend interactions, and data persistence.

## Test Scope

The E2E tests cover the following critical user flows:

### 1. User Authentication
- User registration
- User login
- Logout functionality
- Session management

### 2. Product Browsing
- Product catalog display
- Product search functionality
- Product filtering and sorting
- Product detail view

### 3. Shopping Cart
- Add products to cart
- Update cart quantities
- Remove items from cart
- Cart persistence across sessions

### 4. Checkout Process
- Shipping information entry
- Payment method selection
- Order review
- Order confirmation

### 5. Order Management
- Order history
- Order tracking
- Order status updates

## Testing Tools

Based on the project dependencies, the recommended E2E testing setup would include:

- **Playwright**: Modern, reliable E2E testing framework with cross-browser support
- **Cypress**: Alternative option with great developer experience
- **Testing Library**: For component integration testing

## Running E2E Tests

To run E2E tests, execute the following commands:

```bash
# Run E2E tests in headless mode
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug
```

## Test Structure

```
e2e/
├── auth.spec.ts           # Authentication tests
├── catalog.spec.ts        # Product browsing tests
├── cart.spec.ts           # Shopping cart tests
├── checkout.spec.ts       # Checkout flow tests
├── orders.spec.ts         # Order management tests
└── utils/
    ├── fixtures.ts       # Test data fixtures
    └── helpers.ts        # Helper functions
```

## Best Practices

1. **Test Independence**: Each test should be independent and not rely on the state from previous tests
2. **Data Cleanup**: Clean up test data before and after each test run
3. **Selectors**: Use data-testid attributes or role-based selectors for stability
4. **Assertions**: Write clear, specific assertions
5. **CI Integration**: E2E tests should run in CI/CD pipeline for critical flows
6. **Parallelization**: Run tests in parallel to reduce execution time

## Maintenance

- Keep tests updated when UI changes occur
- Review and refactor flaky tests regularly
- Maintain test data fixtures
- Document any complex test scenarios

For more information about the application architecture, refer to the main README.md.