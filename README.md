# Data SEO Click

## Installation

```shell
yarn add @antipodes-medical/data-seo-click
```

Dans le Javascript :

```javascript
import DataSeo from '@antipodes-medical/data-seo-click'
```

## Utilisation

```javascript
new DataSeo(
        [
            {
                "name": "First div",
                "elements": [
                    {
                        "name": "First link in first div",
                        "selector": ".first-div__first-link"
                    },
                    {
                        "selector": ".first-div__second-link"
                    }
                ]
            },
            {
                "name": "Second div",
                "elements": [
                    {
                        "name": "Links inside second div",
                        "selector": [
                            ".second-div__first-link",
                            ".second-div__second-link"
                        ]
                    }
                ]
            }
        ]
)
```