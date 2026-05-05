# ADR-IA — Choix du modèle et de la feature IA

**Date :** ?
**Statut :** Accepté

## Contexte

Le sujet impose l'implémentation d'une feature IA légère avec les
contraintes suivantes :

- Modèle < 500 MB sur disque
- Résultat en < 5 secondes par offre
- Pas de fine-tuning au démarrage du container
- Pas d'API externe (OpenAI, Anthropic, etc. interdits)

---

## Why

Les utilisateurs de la plateforme sont des développeurs cherchant
des offres pertinentes. Afficher un **score de matching** entre
le profil de l'utilisateur et une offre d'emploi permet de
prioriser les offres les plus adaptées et réduit le temps de
recherche. C'est une valeur ajoutée directe et mesurable.

---

## How

### Méthode choisie — ?

### Fonctionnement du score de matching ? (diagramme de pipeline)

### Implémentation ?

### Contraintes respectées ?

### Intégration dans la plateforme ?

## Trade-off ?

---

## Évaluation

### Mesure de succès ?

### Limitations connues ?

---

## Alternative rejetée ?

---

## Références

- Code : ?
- Intégration : ?
- Affiché dans : ?
