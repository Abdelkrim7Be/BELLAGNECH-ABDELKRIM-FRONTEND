# Models

This directory contains TypeScript interfaces for DTOs.

## Implemented Models

### Core Models

- `client.model.ts`: Client data model
- `credit.model.ts`: Base Credit model and sub-types (CreditPersonnel, CreditImmobilier, CreditProfessionnel)
- `remboursement.model.ts`: Repayment data model

### Enums

- `statut-credit.enum.ts`: Credit status values (EN_COURS, APPROUVE, REFUSE, TERMINE)
- `statut-remboursement.enum.ts`: Repayment status values (A_PAYER, PAYE, EN_RETARD)
- `type-remboursement.enum.ts`: Repayment frequency types (MENSUEL, TRIMESTRIEL, SEMESTRIEL, ANNUEL, UNIQUE)
- `type-bien.enum.ts`: Property types for real estate credits (APPARTEMENT, MAISON, TERRAIN, LOCAL_COMMERCIAL, AUTRE)

### Usage

Import models and enums from the barrel file:

```typescript
import { Client, Credit, CreditImmobilier, Remboursement, StatutCredit } from "../models";
```
