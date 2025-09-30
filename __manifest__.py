# -*- coding: utf-8 -*-
{
    'name': "Greetings",

    'summary': "Greetings in different languages",

    'description': """
        Grettings in different languages for Odoo 18.0
    """,

    'author': "Gianmarco Contreras",
    'website': "https://github.com/CodigoByte2020",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Learnings/Learning',
    'version': '0.1',
    'license': 'AGPL-3',


    # any module necessary for this one to work correctly
    'depends': ['base', 'web'],

    # always loaded
    'data': [
        'views/greet_dashboard.xml'
    ],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_backend': [
            'dashboard/static/src/components/**/*.js',
            'dashboard/static/src/components/**/*.xml',
        ]
    }
}
