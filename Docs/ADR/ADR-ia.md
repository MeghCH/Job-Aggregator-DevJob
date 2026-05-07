<<<<<<< HEAD
# ADR-IA — Model selection and AI feature

**Date:** ?
**Status:** Accepted

## Context

The project mandates the implementation of a lightweight AI feature with the following constraints:

- Model size < 500 MB on disk
- Result in < 5 seconds per offer
- No fine-tuning during container startup
- No external APIs (OpenAI, Anthropic, etc. are forbidden)
=======
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
>>>>>>> 6ad491c6563e7f78e560720a578abddedb07549c

---

## Why

<<<<<<< HEAD
Users of the platform are developers looking for relevant job offers. Displaying a **matching score** between the user's profile and a job offer allows for the prioritization of the most suitable offers and reduces search time. This provides direct and measurable added value.
=======
Les utilisateurs de la plateforme sont des développeurs cherchant
des offres pertinentes. Afficher un **score de matching** entre
le profil de l'utilisateur et une offre d'emploi permet de
prioriser les offres les plus adaptées et réduit le temps de
recherche. C'est une valeur ajoutée directe et mesurable.
>>>>>>> 6ad491c6563e7f78e560720a578abddedb07549c

---

## How

<<<<<<< HEAD
### Chosen method — ?

### How the matching score works ? (pipeline diagram)

### Implementation ?

### Constraints respected ?

### Integration into the platform ?
=======
### Méthode choisie — ?

### Fonctionnement du score de matching ? (diagramme de pipeline)

### Implémentation ?

### Contraintes respectées ?

### Intégration dans la plateforme ?
>>>>>>> 6ad491c6563e7f78e560720a578abddedb07549c

## Trade-off ?

---

<<<<<<< HEAD
## Evaluation

### Success measurement ?

### Known limitations ?

---

## Rejected alternative ?

---

## References

- Code: ?
- Integration: ?
- Displayed in: ?
=======
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
>>>>>>> 6ad491c6563e7f78e560720a578abddedb07549c
