Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)]
}

Array.prototype.randomize = function () {
	var i = this.length, j, temp

	while (--i) {
		j = Math.floor(Math.random() * (i - 1))
		temp = this[i]
		this[i] = this[j]
		this[j] = temp
	}
}

Array.prototype.clone = function () {
	return this.slice(0)
}

String.prototype.randomRepeat = function (len) {
	return this + (new Array(Math.floor(Math.random() * (len - 1)))).join(this)
}

var generateSentence,
    generateInsult,
    generateParagraph,
    randomBoolean = function () {
	    return Math.round(Math.random()) == 1
    },
    insults = [
	    'burn in hell',
	    'check your %privilege privilege',
	    'die in a fire',
	    'go drown in your own piss',
	    'fuck you',
	    'kill yourself',
	    'go play in traffic',
	    'make love to yourself in a furnace',
	    'please die',
	    'rot in hell',
	    'screw you',
	    'shut the fuck up',
	    'shut up',
	    'drop dead',
	    'fuck off',
    ],
    insultAdverbs = [
	    'deluded',
	    'fucking',
	    'ignorant',
	    'goddamn',
	    'judgemental',
	    'worthless',
	    'entitled',
	    'oppressive',
    ],
    insultNouns = [
	    'asshole',
	    'bigot',
	    'hitler',
	    'oppressor',
	    'piece of shit',
	    'rapist',
	    'scum',
	    'subhuman',
	    'nazi',
	    'fascist',
	    'rape-apologist',
	    'MRA',
	    'neckbeard',
	    'pedophile',
	    'virgin',
	    'basement dweller',
	    'dudebro',
	    'brogrammer',
	    'redditor',
	    'creep',
    ],
    marginalizedNouns = [
	    'activist', 'agender', 'appearance', 'asian', 'attractive',
	    'bi', 'bigender', 'black', 'celestial', 'chubby', 'closet',
	    'color', 'curvy', 'dandy', 'deathfat', 'demi', 'differently abled',
	    'disabled', 'diversity', 'dysphoria', 'estrogen-affinity', 'ethnic',
	    'ethnicity', 'fat love', 'fat', 'fatty', 'female',
	    'genderfuck', 'genderless', 'body hair', 'height',
	    'indigenous', 'intersectionality', 'intersexual', 'invisible', 'kin',
	    'little person', 'marginalized', 'minority',
	    'multigender', 'non-gender', 'non-white', 'obesity', 'otherkin', 'omnisexual',
	    'pansexual', 'polygender', 'polyspecies', 'privilege', 'prosthetic', 'queer',
	    'radfem', 'skinny', 'smallfat', 'stretchmark', 'thin',
	    'third-gender', 'trans*', 'transethnic', 'transgender', 'transman',
	    'transwoman', 'trigger', 'two-spirit', 'womyn', 'wymyn', 'saami', 'native american',
	    'hijra', 'transnormative', 'LGBTQIA+',
	    'cross-dresser', 'androphilia', 'gynephilia', 'PoC', 'WoC',
    ],
    marginalizedAdverbs = [
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
	    'objectifying',
	    'attacking',
	    'ignoring',
	    'rape-culture-supporting',
	    'sexist',
	    'patriarchal',
	    'close-minded',
	    'antediluvian',
    ],
    marginalizedIsms = [
	    'feminist',
	    'fatist',
	    'racist',
	    'lesbianist',
	    'freeganist',
    ],
    privilegedNouns = [
	    'able-body',
	    //'appearance',
	    //'attractive',
	    'binary',
	    'cis',
	    'cisgender',
	    'cishet',
	    'hetero',
	    'male',
	    'middle-class',
	    'smallfat',
	    'thin',
	    'white',
    ],
    privilegedAdverbs = [
	    'privileged',
	    'overprivileged',
	    'normative',
    ],
    privilegedIsms = [
	    'ableist',
	    'classist',
	    'patriarchist',
	    'sexist',
	    'anti-feminist',
	    'kyriarchist',
	    'misogynist',
	    'chauvinist',
	    'nazi',
	    'transmisogynist',
    ],
    sexualities = (function () {
	    var result = [],
	        personalPrefixes = [
		        'dandy',
		        'demi',
		        'gender',
	        ],
	        personalPostfixes = [
		        'amorous',
		        'femme',
		        'fluid',
		        'queer',
		        'fuck',
	        ],
	        sexualPrefixes = [
		        'a',
		        'bi',
		        'demi',
		        'multi',
		        'non',
		        'omni',
		        'pan',
		        'para',
		        'poly',
	        ],
	        sexualPostfixes = [
		        'gender',
		        'sexual',
		        'romantic',
		        'queer',
	        ]

	    $.each(personalPrefixes, function (i, pre) {
		    $.each(personalPostfixes, function (i, post) {
			    result.push(pre + post)
		    })
	    })
	    $.each(sexualPrefixes, function (i, pre) {
		    $.each(sexualPostfixes, function (i, post) {
			    result.push(pre + post)
		    })
	    })

	    return result
    })(),
    otherAwesomeStuff = [
	    'gender abolition',
	    'female superiority',
    ],
    otherTerribleStuff = [
	    'internalized misogynism',
	    'internalized patriarchy',
	    'male domination',
	    'gender roles',
	    'rape culture',
	    'institutionalized racism',
    ],
    randomPrivilege = function () {
	    return privilegedNouns.random()
    },
    randomInsult = function () {
	    if (randomBoolean()) {
		    return insultAdverbs.random() + ' ' + insultNouns.random()
	    }
	    return insultNouns.random()
    },
    randomAwesomeStuff = function () {
	    return otherAwesomeStuff.random()
    },
    randomTerribleStuff = function () {
	    return otherTerribleStuff.random()
    },
    verbs = [
	    ['deny', 'denying', 'denial'],
	    ['discriminate', 'discriminating', 'discrimination'],
	    ['sexualize', 'sexualizing', 'sexualization'],
	    ['hypersexualize', 'hypersexualizing', 'hypersexualization'],
	    ['oppress', 'oppressing', 'oppression'],
	    ['shame', 'shaming', 'shaming'],
	    ['marginalize', 'marginalizing', 'marginalization'],
	    ['objectify', 'objectifying', 'objectification'],
	    ['attack', 'attacking', 'attacking'],
	    ['ignore', 'ignoring', 'ignoring'],
    ],
    sentences = [
	    { forms: [1], format: 'you %insult, stop %verb %marginalized-%person', type: '!', },
	    { forms: [1], format: 'you are a %marginalized-%verb %insult', type: '!', },
	    { forms: [1], format: 'you should stop fucking %verb %marginalized-%person', type: '!', },
	    { forms: [0], format: 'why the fuck do you feel the need to %verb %marginalized-%person you %insult', type: '?', },
	    { forms: [0], format: 'leave %marginalized-%person the fuck alone you %insult', type: '!', },
	    { forms: [1], format: 'stop fucking %verb %marginalized-%person you %insult', type: '!', },
	    { forms: [0], format: 'what the fuck has %subject ever done to you you %insult', type: '!', },
	    { forms: [2], format: 'your %verb of %marginalized-%person is problematic', type: '!', },
    ],
    subjects = [
	    { names: ['xe', 'ze'] },
    ],
    intros = [
	    'wow. just. wow.',
	    'no. just. no.',
	    'this. is. NOT. okay.',
	    'just a friendly reminder:',
	    '[TW: rant]',
    ],
    statements = [
	    'you should be ashamed of yourself',
	    'you make me sick',
	    '%insult',
	    'die in a fire',
	    'stop offending me you %insult',
	    'you are the worst person alive',
	    'people like you deserve to die',
	    'what the fuck do you have against %awesomestuff you %insult',
	    'you are worse than hitler',
	    'it\'s not my job to educate you you %insult',
	    'fuck your %terriblestuff',
	    'you are perpetuating %terriblestuff you %insult',
	    'you are triggering me you %insult',
	    'stop tone policing me you %insult',
	    'i hope you fucking die you %insult',
    ],
    emoji = [
	    '(◕﹏◕✿)',
	    '（　｀ー´）',
	    '(•﹏•)',
	    '└(｀0´)┘',
    ]

// Add sexualities to marginalized groups
marginalizedNouns = marginalizedNouns.concat(sexualities)

generateSentence = function () {
	var index = Math.floor(verbs.length * Math.random()),
	    sentence = sentences.random(),
	    subject = subjects.random(),
	    verb = verbs[index],
	    str = sentence.format

	str = str.replace(/%subject/gi, subject.names.random())
	str = str.replace(/%verb/gi, verb[sentence.forms.random()])
	str = str.replace(/%marginalized/gi, marginalizedNouns.random())
	str = str.replace(/%person/gi, ['identifying', 'aligned'].random() + ' ' + ['people', 'personalities', 'individuals'].random())
	str += sentence.type.randomRepeat(10)

	return str
}

generateInsult = function (initial) {
	var result = ''

	if (initial) {
		result += insults.random()
		result += ', you '

		if (randomBoolean()) {
			result += insultAdverbs.random() + ' '
		}
		if (randomBoolean()) {
			result += (randomBoolean() ? marginalizedIsms.random() : marginalizedNouns.random()) + '-' + marginalizedAdverbs.random() + ', '
		}
	}
	else {
		result += 'you '
	}

	result += privilegedNouns.random() + '-' + privilegedAdverbs.random() + ' '

	if (randomBoolean()) {
		result += insultNouns.random() + ' '
	}
	else {
		result += privilegedIsms.random() + ' '
	}

	return result.trim()
}

generateParagraph = function (onlyInsult) {
	var result = [],
	    length = 3 + Math.random() * 10,
	    sentence = '', i, wrap

	if (onlyInsult) {
		length = 1
	}

	for (i = 0; i < length; i += 1) {
		if (i === 0) {
			if (Math.random() > 0.3 && !onlyInsult) {
				sentence += intros.random() + ' '
			}

			sentence += generateInsult(true)

			if (!onlyInsult) {
				sentence += '!'.randomRepeat(10)
			}
		}
		else {
			sentence = [
				generateInsult(false) + '!'.randomRepeat(10),
				generateSentence(),
				statements.random() + '!'.randomRepeat(10),
			].random().trim()
		}

		sentence = sentence.replace(/%privilege/gi, randomPrivilege)
		sentence = sentence.replace(/%insult/gi, randomInsult)
		sentence = sentence.replace(/%terriblestuff/gi, randomTerribleStuff)
		sentence = sentence.replace(/%awesomestuff/gi, randomAwesomeStuff)

		// Randomly make stuff literal
		sentence = sentence.replace(/you are/g, function () {
			return randomBoolean() ? 'you\'re literally' : 'you\'re'
		})

		// Randomly uppercase sentences
		sentence = (randomBoolean() || onlyInsult) ? sentence.toUpperCase() : sentence

		// Tumblrize grammar
		if ($('#tumblrize-grammar').prop('checked')) {
			// Randomly add out-of-place commas
			sentence = sentence.replace(/\b /g, function () {
				return Math.random() > 0.05 ? ' ' : [',', '.'].random().randomRepeat(4)
			})

			// Randomly lowercase first characters
			sentence = sentence.replace(/^(\w)/g, function (m, p1) {
				return Math.random() > 0.3 ? p1 : p1.toLowerCase()
			})

			// Randomly add tildes and asterisks around sentences
			if (Math.random() > 0.8) {
				wrap = '~'.randomRepeat(5)
				if (Math.random() > 0.3) {
					wrap += '*'
				}
				sentence = wrap + sentence + wrap.split('').reverse().join('')
			}

			// Convert you/you're, etc
			sentence = sentence.replace(/you're/g, 'ur')
			sentence = sentence.replace(/YOU'RE/g, 'UR')
			sentence = sentence.replace(/you/g, 'u')
			sentence = sentence.replace(/YOU/g, 'U')
			sentence = sentence.replace(/people/g, 'ppl')
			sentence = sentence.replace(/PEOPLE/g, 'PPL')

			// Add emoji faces
			if (Math.random() > 0.8) {
				sentence += emoji.random()
			}
		}

		result.push(sentence)
	}

	result = result.join(' ')

	if (!onlyInsult) {
		result += '!'.randomRepeat(10)
	}

	return result
}

$(document).ready(function () {
	$('#argument')
		.removeClass('loading')
		.text(generateParagraph(true))

	$('.controls button.generate-insult').click(function () {
		$('#argument').text(generateParagraph(true))
	})
	$('.controls button.generate-rant').click(function () {
		$('#argument').text(generateParagraph(false))
	})
})
