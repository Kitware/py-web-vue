#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import re

from setuptools import setup, find_packages

# perform the install
setup(
    name='pywebvue',
    description='Python server creating interactive vue app over WebSocket',
    long_description='Build a 3D Web application using VTK or ParaView while only writing a Python script. This project aims to streamline the existing ParaViewWeb infrastructure into something that is simpler to use by lowering the entry point complexity.',
    author='Kitware, Inc.',
    author_email='kitware@kitware.com',
    url=f'https://github.com/kitware/py-web-vue',
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
    package_data={"pywebvue":["www/*", "www/*/*"]},
    install_requires=['wslink'],
)