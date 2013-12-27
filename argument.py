#!/usr/bin/env python

from random import choice

intro = [
	'burn in hell',
	'screw you',
	'shut up',
]
pre = [
	'agender',
	'appearance',
	'asexual',
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
	'ethnicity',
	'fat',
	'feminist',
	'genderfluid',
	'genderfuck',
	'genderless',
	'genderqueer',
	'hair',
	'hetero',
	'invisible',
	'kin',
	'little person',
	'minority',
	'non-gender',
	'normative',
	'other',
	'otherkin',
	'otherwise abled',
	'pansexual',
	'privilege',
	'prosthetic',
	'queer',
	'skinny',
	'stretchmark',
	'thin',
	'third-gender',
	'trans*',
	'transgender',
	'transman',
	'transwoman',
	'two-spirit',
]
post = [
	'denying',
	'discriminating',
	'femme',
	'normative',
	'nphobic',
	'oppressive',
	'overprivileged',
	'phobic',
	'privileged',
	'racist',
	'shaming',
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
