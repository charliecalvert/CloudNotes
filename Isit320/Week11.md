Week 11
=======

Sprites
-------------

A sprite is a visual element on the Crafty board. For 
instance a Village/Tower is a sprite, as are the Food
icons. 

The main character interacts with sprites in one of three
ways:

- A bush or tree sprite acts like a wall. It is solid and can't
be passed.
- A Village/Tower sprite is "encountered" and some kind of 
competition occurs
- A Food Sprite is a Bonus it causes the main character to
gain or lose health, or some other property.

I realize, of course, that in some people's games sprites are not
called Villages or Towers, and they are not called Food. This
is not important. 

Things you must have in the final:

- At least three levels
- Each level has a difference predefined set of
	- Villiages and Towers Sprites
	- FoodBonus Sprites
	- HealthBonus Sprites
	- StrengthBonus Sprites
- You must load the predefined sprites from a JSON file
or database. Typically, you would at least need to include
the X, Y coordinates of the sprite in the file or database
document/record.
