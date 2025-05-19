# Services

This directory contains Angular services for API calls.

## Implemented Services

- `base.service.ts`: Base service with common error handling functionality
- `client.service.ts`: CRUD operations for clients
- `credit.service.ts`: CRUD operations for credits and sub-types
- `remboursement.service.ts`: CRUD operations for repayments

## Usage

All services provide the following standard methods:

- `getAll()`: Retrieve all entities
- `getById(id)`: Retrieve a specific entity by ID
- `add(obj)`: Create a new entity
- `update(obj)`: Update an existing entity
- `delete(id)`: Delete an entity

Additional methods:

- `CreditService.getByClientId(clientId)`: Get all credits for a specific client
- `RemboursementService.getByCreditId(creditId)`: Get all repayments for a specific credit

## Error Handling

All services use the common error handling from the BaseService, which:

- Handles both client-side and server-side errors
- Logs errors to the console
- Returns an Observable with an error message
