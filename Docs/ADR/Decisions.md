ADR 003: Innovation Justification – Centralization & Clarity

Status: Proposed

Date: 2026-05-05

Context: Project "jobAggregator-project.pdf" (Epitech)
1. Product Context: The "Search Fatigue" Problem

Addressed User Problem:

Currently, job seekers suffer from "search fatigue" due to market fragmentation. They must navigate between dozens of different platforms (LinkedIn, Indeed, specialized sites), each with its own UI and filters. This makes it extremely difficult to maintain a clear overview of the market or to compare opportunities efficiently.

Innovation Goal:

To provide a single "Source of Truth" by aggregating multiple sources (starting with WeLoveDevs) into a standardized interface.
2. Data Feature: Standardized Comparison Dashboard

Addressed User Problem:

Comparing jobs across different sites is confusing because information is not presented in the same way (e.g., one site highlights salary, another focuses on tech stack).

Feature Hypothesis:

By implementing a Data Normalization layer during ingestion, we can provide a Unified Comparison Dashboard. We hypothesize that users will reduce their daily search time by 40% if they can compare key metrics (location, contract, salary) in a single, standardized table.

Approach Relevance (Why):

Standardization is the core value of an aggregator. It solves the "visual noise" problem of switching tabs between different job boards.

Success Measurement:

    Metric: 100% of ingested offers from WeLoveDevs and secondary sources follow the exact same data schema.

    UX Metric: User ability to filter across all sources simultaneously via the Dashboard.

3. AI Feature: Semantic Simplifier & Attribute Extraction

Addressed User Problem:

Many job descriptions are unnecessarily complex, long, or vague, making it hard to quickly extract the actual requirements.

Feature Hypothesis:

By using a lightweight NLP model for "Keyword & Attribute Extraction", we will automatically generate a "Tech & Perks" summary for every offer. This replaces complex paragraphs with a clear, readable list of essential information.

Approach Relevance (Why & Constraints):

    Compliance: The model is stored locally and stays under 500 MB to meet technical constraints.

    Performance: The extraction is performed in under 5 seconds per offer to ensure the manual trigger remains responsive.

Success Measurement:

    Technical Metric: Inference time per offer < 5 seconds.

    Effectiveness: Percentage of "complex" descriptions successfully converted into a simplified summary visible on the User Dashboard.

4. Trade-offs & Rejected Alternatives

    Rejected Alternative: Building a simple scraper without normalization.

        Reason: While easier to build, it fails to solve the user's confusion between different sites' layouts.

    Trade-off: We chose to focus on Information Density (AI extraction) over Total Volume. We prefer having fewer, perfectly readable offers than thousands of complex, unreadable ones.