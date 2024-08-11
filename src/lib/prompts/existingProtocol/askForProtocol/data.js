export default [
    {
        "id": "pageable",
        "name": "Pageable",
        "version": "0.0.1",
        "description": "Adds pageing capacity to a Servable app",
        "packages": [
            {
                "id": "@servable-community/pageable-parse-server",
                "description": "",
                "type": "main",
                "components": ["server"],
                "url": "https://github.com/servable-community/pageable-parse-server.git"
            },
            {
                "id": "@servable-community/pageable-parse-classes",
                "description": "",
                "type": "classes",
                "components": ["server"]
            },
        ],
        "author": {
            "name": "Servable Community",
            "email": "servablecommunity@gmail.com",
            "url": "https://servablecommunity.com/"
        },
        "keywords": [
            "node",
            "protocols",
            "servable",
            "yeoman-toolbox"
        ],
        "repository": {
            "type": "git",
            "url": "https://github.com/servable-community/toolbox-servable.git"
        },
        "bugs": {
            "url": "https://github.com/servable-community/toolbox-servable/issues"
        },
        "main": "./toolboxs/app/index.js",
        "homepage": "http://servablecommunity.com",
        "license": "MIT",
        "engines": {
            "node": ">=14.15.0"
        },
        "icon": "https://cdn3d.iconscout.com/3d/free/preview/free-toffee-4356774-3618919.png?f=avif&h=1400",
        "declaration": {
            "template": {
                "id": "pageable",
                "name": "pageable",
                "slug": "pg",
                // module: {
                //     '@servable-community/publishable-parse-server': '*'
                // },
                // version: '*',
                "params": {
                    "apiKey": "<%= apiKey %>",
                    "liveClasses": ["publishable"],
                    "schema": {
                        "restrictSecurity": true
                    }
                }
            },
            "parameters": [
                {
                    "id": "apiKey",
                    "prompt": {
                        "type": "input",
                        "name": "API Key",
                        "message": "API Key",
                        "default": "",
                        "validate": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
            ]
        },

    },
    {
        "id": "emailable",
        "name": "Emailable",
        "version": "0.0.1",
        "description": "Adds email capacity to a Servable app",
        "howto": "Fill the API key",
        "packages": [
            {
                "id": "@servable-community/servable-emailable",
                "description": "",
                "type": "main",
                "components": ["server"],
                "url": "https://github.com/servable-community/servable-emailable.git"
            }
        ],
        "author": {
            "name": "Servable Community",
            "email": "servablecommunity@gmail.com",
            "url": "https://servablecommunity.com/"
        },
        "keywords": [
            "node",
            "protocols",
            "servable",
            "yeoman-toolbox"
        ],
        "repository": {
            "type": "git",
            "url": "https://github.com/servable-community/servable-emailable.git"
        },
        "bugs": {
            "url": "https://github.com/servable-community/servable-emailable.git#issues"
        },
        "main": "./toolboxs/app/index.js",
        "homepage": "http://servablecommunity.com",
        "license": "MIT",
        "engines": {
            "node": ">=14.15.0"
        },
        "email": "servablecommunity@gmail.com",
        "icon": "https://cdn3d.iconscout.com/3d/free/preview/free-toffee-4356774-3618919.png?f=avif&h=1400",
        "declaration": {
            "template": {
                "id": 'emailable',
                "name": 'emailable',
                "slug": 'em',
                "params": {
                    "apiKey": "<%= apiKey %>",
                    "frontWebUrl": "<%= frontWebUrl %>",
                    "env": CliNext.env.NODE_ENV,
                    "appName": CliNext.env.SERVABLE_APP_NAME,
                    "restrictSend": "<%= restrictSend %>",
                    "restrictTo": "<%= restrictTo %>",
                    "restrictToRegex": "<%= restrictToRegex %>",
                    "schema": {
                        "exclude": false
                    }
                }
            },
            "parameters": [
                {
                    "id": "apiKey",
                    "prompt": {
                        "type": "input",
                        "name": "API Key",
                        "message": "API Key",
                        "default": "",
                        "validate": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
                {
                    "id": "frontWebUrl",
                    "prompt": {
                        "type": "input",
                        "message": "Front Web Url",
                        "default": "",
                        "validate": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
                {
                    "id": "restrictSend",
                    "prompt": {
                        "type": "input",
                        "message": "Restrict send",
                        "default": "",
                        "validate": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
                {
                    "id": "restrictTo",
                    "prompt": {
                        "type": "input",
                        "message": "Restrict to",
                        "default": "",
                        "validate": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
                {
                    "id": "restrictToRegex",
                    "prompt": {
                        "type": "input",
                        "message": "Restrict to Regex",
                        "default": "",
                        "validate": {
                            "type": "",
                            "params": {}
                        }
                    }
                }
            ]
        },
    },
    {
        "id": "slugable",
        "name": "Slugable",
        "packages": [
            {
                "id": "@servable-community/slugable",
                "description": "",
                "type": "main"
            }
        ],
        "author": "Servable Community",
        "email": "servablecommunity@gmail.com",
        "description": "Adds slug capacity to a Servable app",
        "icon": "https://cdn3d.iconscout.com/3d/free/preview/free-toffee-4356774-3618919.png?f=avif&h=1400",
    },
    {
        "id": "reviewable",
        "name": "Reviewable",
        "packages": [
            {
                "id": "servable-reviewable",
                "description": "",
                "type": "main"
            }
        ],
        "author": "Servable Community",
        "email": "servablecommunity@gmail.com",
        "description": "Adds review capacity to a Servable app",
        "icon": "https://cdn3d.iconscout.com/3d/free/preview/free-toffee-4356774-3618919.png?f=avif&h=1400",
    },
    {
        "id": "publishable",
        "name": "Publishable",
        "packages": [
            {
                "id": "servable-publishable",
                "description": "",
                "type": "main"
            }
        ],
        "author": "Servable Community",
        "email": "servablecommunity@gmail.com",
        "description": "Adds review capacity to a Servable app",
        "icon": "https://cdn3d.iconscout.com/3d/free/preview/free-toffee-4356774-3618919.png?f=avif&h=1400",
    }
]
