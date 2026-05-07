# ADR-IA — Model selection and AI feature

**Date:** ?
**Status:** Accepted

## Context

The project mandates the implementation of a lightweight AI feature with the following constraints:

- Model size < 500 MB on disk
- Result in < 5 seconds per offer
- No fine-tuning during container startup
- No external APIs (OpenAI, Anthropic, etc. are forbidden)

---

## Why

Users of the platform are developers looking for relevant job offers. Displaying a **matching score** between the user's profile and a job offer allows for the prioritization of the most suitable offers and reduces search time. This provides direct and measurable added value.

---

## How

### Chosen method — ?

### How the matching score works ? (pipeline diagram)

### Implementation ?

### Constraints respected ?

### Integration into the platform ?

## Trade-off ?

---

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