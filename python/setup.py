#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import re

from setuptools import setup, find_packages

MODULE_NAME = 'pywebvue'
VERSION = '0.0.1'

with open(os.path.join(os.path.dirname(__file__), 'src', MODULE_NAME, '__init__.py')) as fd:
    VERSION = re.search(
        r'^__version__\s*=\s*[\'"]([^\'"]*)[\'"]',
        fd.read(),
        re.MULTILINE
    ).group(1)

# perform the install
setup(
    name=MODULE_NAME,
    version=VERSION,
    description='Python server creating interactive vue app over WebSocket',
    long_description='',
    author='Kitware, Inc.',
    author_email='kitware@kitware.com',
    url=f'https://github.com/kitware/{MODULE_NAME}',
    license='BSD-3-Clause',
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'License :: OSI Approved :: BSD License',
        'Natural Language :: English',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 3 :: Only',
        'Programming Language :: JavaScript',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
    keywords='Python Vue.js websocket VTK ParaView Web3D',
    packages=find_packages('src', exclude=('tests.*', 'tests')),
    package_dir={'':'src'},
    install_requires=['wslink'],
)