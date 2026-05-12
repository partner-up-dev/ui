# References

## Local Evidence

Workspace path check on 2026-05-12:

```
F:\CODING\Project\Anana\Application\mvp-HA was not present in this environment.
Current next-component ordering uses the task packet's recorded mvp-HA usage
counts plus packages/web's current component inventory.
```

Inventory commands used during investigation:

```powershell
rg --files packages\web\src\components
rg --files apps\frontend\src\shared\ui
rg "SurfaceCard|ExpandableCard|InfoRow|Cell|Chip|EmptyState|InlineNotice|PageHeader" apps\frontend\src -g "*.vue"
```

Approximate component usage counts from mvp-HA:

```
PageHeader      30
EmptyState       9
InlineNotice    17
Chip            23
ChipGroup        5
FitChipGroup     3
Avatar           4
ChoiceCard      14
LoadingIndicator 45
ErrorToast      47
TabBar           4
BottomDrawer     8
ConfirmDialog    5
SurfaceCard     22
InfoRow          7
Cell             2
ExpandableCard   6
```

Interpretation:

```
The selected five groups focus on content presentation and organization. High
usage feedback primitives like LoadingIndicator and ErrorToast should be handled
in a dedicated feedback task.
```

## External References

WCAG:

```
https://www.w3.org/TR/wcag/
```

Relevant concepts:

```
Info and Relationships
Headings and Labels
Section Headings
```

NN/g:

```
https://www.nngroup.com/articles/how-users-read-on-the-web/
https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
```

Relevant concepts:

```
users scan pages
clear headings help scanning
lists and chunking improve information scent
```

Carbon Structured List:

```
https://carbondesignsystem.com/components/structured-list/usage/
```

Relevant concepts:

```
structured related content
term and definition style reading
simple information browsing
```

Atlassian message design:

```
https://atlassian.design/foundations/content/designing-messages/
```

Relevant concepts:

```
message severity
clear concise inline communication
```
