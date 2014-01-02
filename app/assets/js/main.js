require.config({
	paths: {
		jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
	},
})

define(
	[
		'jquery',
	],
	function ($) {
		var getRandomItem,
		    generateTerm,
		    generateArgument,
		    intro = [
			    'burn in hell',
			    'check your privilege',
			    'die in a fire',
			    'fuck you',
			    'kill yourself',
			    'please die',
			    'rot in hell',
			    'screw you',
			    'shut the fuck up',
			    'shut up',
		    ],
		    description = [
			    'deluded',
			    'fucking',
			    'god damn',
			    'judgemental',
			    'worthless',
		    ],
		    marginalized = [
			    [
				    'activist',
				    'agender',
				    'appearance',
				    'asian',
				    'attractive',
				    'bi',
				    'bigender',
				    'black',
				    'celestial',
				    'chubby',
				    'closet',
				    'color',
				    'curvy',
				    'dandy',
				    'deathfat',
				    'demi',
				    'differently abled',
				    'disabled',
				    'diversity',
				    'dysphoria',
				    'ethnic',
				    'ethnicity',
				    'fat love',
				    'fat',
				    'fatist',
				    'fatty',
				    'female',
				    'feminist',
				    'genderfuck',
				    'genderless',
				    'hair',
				    'height',
				    'indigenous',
				    'intersectionality',
				    'invisible',
				    'kin',
				    'lesbianism',
				    'little person',
				    'marginalized',
				    'minority',
				    'multigender',
				    'non-gender',
				    'non-white',
				    'obesity',
				    'otherkin',
				    'pansexual',
				    'polygender',
				    'privilege',
				    'prosthetic',
				    'queer',
				    'radfem',
				    'skinny',
				    'smallfat',
				    'stretchmark',
				    'thin',
				    'third-gender',
				    'trans*',
				    'transgender',
				    'transman',
				    'transwoman',
				    'trigger',
				    'two-spirit',
				    'womyn',
			    ],
			    [
				    'chauvinistic',
				    'denying',
				    'discriminating',
				    'hypersexualizing',
				    'intolerant',
				    'misogynistic',
				    'nphobic',
				    'oppressive',
				    'phobic',
				    'racist',
				    'sexualizing',
				    'shaming',
			    ]
		    ],
		    privileged = [
			    [
				    'able-bodied',
				    'appearance',
				    'attractive',
				    'binary',
				    'cis',
				    'cisgender',
				    'cishet',
				    'hetero',
				    'male',
				    'rich',
				    'smallfat',
				    'thin',
				    'white',
			    ],
			    [
				    'ableist',
				    'classist',
				    'normative',
				    'overprivileged',
				    'patriarch',
				    'privileged',
				    'sexist',
			    ]
		    ],
		    finisher = [
			    'asshole',
			    'bigot',
			    'oppressor',
			    'piece of shit',
			    'rapist',
			    'scum',
			    'subhuman',
		    ]

		getRandomItem = function (array) {
			return array[Math.floor(Math.random() * array.length)]
		}

		generateTerm = function () {
			return getRandomItem([
				'a',
				'bi',
				'dandy',
				'demi',
				'gender',
				'multi',
				'pan',
				'poly',
			]) + getRandomItem([
				'amorous',
				'femme',
				'fluid',
				'queer',
				'romantic',
				'sexual',
			])
		}

		generateArgument= function () {
			return [
				getRandomItem(intro),
				', you ',
				getRandomItem(description),
				' ',
				getRandomItem([
					generateTerm(),
					getRandomItem(marginalized[0])
				]),
				'-',
				getRandomItem(marginalized[1]),
				', ',
				getRandomItem(privileged[0]),
				'-',
				getRandomItem(privileged[1]),
				' ',
				getRandomItem(finisher),
			].join('').toUpperCase()
		}

		$(document).ready(function () {
			$('#argument')
				.removeClass('loading')
				.text(generateArgument())

			$('.controls button.generate').click(function () {
				$('#argument').text(generateArgument())
			})
		})
	}
)
