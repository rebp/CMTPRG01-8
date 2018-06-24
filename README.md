# Cookie Monsters

## Inleiding

Toelichting van je spelconcept

## Speelbare game

[Lik](https://rebp.github.io/CMTPRG01-8/)

## Installatie

#### Repository kopieren:
- `git@github.com:rebp/CMTPRG01-8.git`

#### Project installeren:
- Visual Studio Code openen
- Terminal openen en repository clonen `git clone git@github.com:rebp/CMTPRG01-8.git` 
- Build/Watch: `Shift + CMD + B`


## Klassendiagram

[![Klassediagram](https://github.com/rebp/monster-shooter/blob/master/docs/images/klassediagram.jpg?raw=true)](https://github.com/rebp/monster-shooter/blob/master/docs/images/klassediagram.jpg?raw=true)

## Pull request

[Link](https://github.com/Hsnzync/monster-shooter/pull/1)

## Peer review

[Link](https://github.com/Hsnzync/monster-shooter/issues/2)

## Singleton

De Singleton Pattern zit in de Game class. Op deze manier is the game class globaal toegankelijk.
De singleton class heb ik in de normalBehavior class toegepast.

## Polymorfisme

- De player, enemies en upgrades extenden allemaal van de DomObject class
-

## Strategy

De strategy pattern zit in de move behavior van de player. De player heeft dmv deze pattern twee verschillende behaviours.


## Observer

In de Observer pattern zijn de enemies de observers en player is de subject.
