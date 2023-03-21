# react-table-test

Test de la librairie React Table (https://react-table-v7.tanstack.com/) avec Reactstrap (https://reactstrap.github.io).

## Problèmes en cours

Pas possible de faire des tooltip avec des useExpanded : l'id de l'élément dans le DOM est utilisé par le useExpanded.

Pas possible de faire des <input> avec des useExpanded : le rowId affiché dans le onUpdate() est sur un entier, il devrait être sur n.n.n lorsque l'on tente de mettre à jour un petit-fils par exemple.
