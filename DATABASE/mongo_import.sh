#!/bin/sh

# Copyright (c) 2016, Crossover and/or its affiliates. All rights reserved.
# CROSSOVER PROPRIETARY/CONFIDENTIAL.
#
#     https://www.crossover.com/
#
mongo Crossover --eval "db.dropDatabase()"
mongoimport -d Crossover -c User User.json
mongoimport -d Crossover -c Book Book.json
mongoimport -d Crossover -c Demand Demand.json
