
export default [
    'appagentable',
    'localable',
    'countryable',
    'taggable',
    '@servable-community/slugable',
    '@servable-community/usersinable',
    'reviewable',
    'versionable',
    '@adoucoure/felwinable',
    'printable',
    '@servable-community/commentable',
    {
        id: '@servable-community/framable',
        name: '@servable-community/framable',
        slug: 'fr',
        params: {
            apiKey: process.env.SENDGRID_API_KEY,
            frontWebUrl: process.env.FRONT_WEB_URI,
            env: process.env.NODE_ENV,
            appName: process.env.SERVABLE_APP_NAME,
            restrictSend: process.env.EMAILABLE_RESTRICT_SEND,
            restrictTo: process.env.EMAILABLE_RESTRICT_SEND_TO,
            restrictToRegex: process.env.EMAILABLE_RESTRICT_SEND_TO_REGEX,
            schema: {
                exclude: false
            }
        }
    },
    'reactable',
    '@servable-community/rolehostable',
    'searchable',
    'currencyable',
    'disposableorphansable',
    'disposablechildrenable',
    'savable',
    'sharable',
    {
        id: 'publishable',
        name: 'publishable',
        slug: 'ps',
        // module: {
        //     'servable-publishable-server': '*'
        // },
        // version: '*',
        params: {
            liveClasses: ['publishable'],
            schema: {
                restrictSecurity: true
            }
        }
    },
    'followable',
    'faqable',
    'userproxyable',
    'addressable',
    'addresssocialable',
    '@servable-community/userrequestable',
    'servableconfigurable'
]