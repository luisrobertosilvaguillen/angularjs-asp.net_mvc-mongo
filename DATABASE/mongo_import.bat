@echo off
rem Copyright (c) 2016, Crossover and/or its affiliates. All rights reserved.
rem CROSSOVER PROPRIETARY/CONFIDENTIAL.
rem
rem     https://www.crossover.com/
rem

setlocal

mongo Crossover --eval "db.dropDatabase()"
mongoimport -d Crossover -c User User.json
mongoimport -d Crossover -c Book Book.json
mongoimport -d Crossover -c Demand Demand.json

:end
