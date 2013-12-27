#!/usr/bin/env python

from random import choice

intro = [
	'burn in hell',
	'screw you',
]
pre = [
	'agender',
	'asexual',
	'appearance',
	'attractive',
	'bi',
	'bigender',
	'black',
	'celestial',
	'chubby',
	'cis',
	'cisgender',
	'closet',
	'color',
	'curvy',
	'dandy',
	'demi',
	'disabled',
	'fat',
	'feminist',
	'genderfluid',
	'genderfuck',
	'genderless',
	'genderqueer',
	'hair',
	'hetero',
	'invisible',
	'little person',
	'minority',
	'minority',
	'non-gender',
	'normative',
	'otherwise abled',
	'pansexual',
	'privilege',
	'prosthetic',
	'queer',
	'skinny',
	'thin',
	'third-gender',
	'trans*',
	'transgender',
	'two-spirit',
	'stretchmark',
]
post = [
	'discriminating',
	'femme',
	'kin',
	'nphobic',
	'oppressive',
	'overprivileged',
	'phobic',
	'privileged',
	'queer',
	'racist',
	'shaming',
	'normative',
	'oppressive',
]
finisher = [
	'motherfucker',
	'piece of shit',
	'shitlord',
]

print('{0}, you {1}-{2} {3}'.format(
	choice(intro),
	choice(pre),
	choice(post),
	choice(finisher)
).upper())
