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
    ],
    marginalizedNouns = [
	    'activist', 'agender', 'appearance', 'asian', 'attractive',
	    'bi', 'bigender', 'black', 'celestial', 'chubby', 'closet',
	    'color', 'curvy', 'dandy', 'deathfat', 'demi', 'differently abled',
	    'disabled', 'diversity', 'dysphoria', 'ethnic',
	    'ethnicity', 'fat love', 'fat', 'fatist', 'fatty', 'female',
	    'feminist', 'genderfuck', 'genderless', 'body hair', 'height',
	    'indigenous', 'intersectionality', 'invisible', 'kin',
	    'lesbianism', 'little person', 'marginalized', 'minority',
	    'multigender', 'non-gender', 'non-white', 'obesity', 'otherkin',
	    'pansexual', 'polygender', 'privilege', 'prosthetic', 'queer',
	    'radfem', 'skinny', 'smallfat', 'stretchmark', 'thin',
	    'third-gender', 'trans*', 'transgender', 'transman',
	    'transwoman', 'trigger', 'two-spirit', 'womyn', 'saami', 'native american',
	    'hijra', 'freeganist', 'transnormative', 'LGBT', 'LGBTQ+', 'LGBTQIA',
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
    ],
    privilegedNouns = [
	    'able-body',
	    'appearance',
	    'attractive',
	    'binary',
	    'cis',
	    'cisgender',
	    'cishet',
	    'hetero',
	    'male',
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
		        'pan',
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
    randomPrivilege = function () {
	    return privilegedNouns.random()
    },
    randomInsult = function () {
	    if (randomBoolean()) {
		    return insultAdverbs.random() + ' ' + insultNouns.random()
	    }
	    return insultNouns.random()
    },
    verbs = [
	    ['deny', 'denies', 'denying', 'denied'],
	    ['discriminate', 'discriminates', 'discriminating', 'discriminated'],
	    ['sexualize', 'sexualizes', 'sexualizing', 'sexualized'],
	    ['hypersexualize', 'hypersexualizes', 'hypersexualizing', 'hypersexualized'],
	    ['oppress', 'oppresses', 'oppressing', 'oppressed'],
	    ['shame', 'shames', 'shaming', 'shamed'],
    ],
    sentences = [
	    { forms: [2], format: 'you %insult, stop %verb %complement %person', type: '!', },
	    { forms: [2], format: 'you are a %complement %verb %insult', type: '!', },
	    { forms: [2], format: 'you should stop %verb %complement %person', type: '!', },
	    { forms: [0], format: 'why the fuck do you feel the need to %verb %complement %person you %insult', type: '?', },
	    { forms: [0], format: 'leave %complement %person alone you %insult', type: '!', },
    ],
    subjects = [
	    { names: ['one', 's/he', 'he/she', 'xe', 'ze', 'zie', 'hir'], be: 'is', singular: 1 },
    ],
    statements = [
	    'you should be ashamed of yourself',
	    'you make me sick',
	    '%insult',
	    'do you not see how offensive this is',
	    'you are the worst person alive',
	    'people like you should die',
	    'what do you have against gender abolition',
	    'you are worse than hitler',
	    'it\'s not my job to educate you, you %insult',
    ]

// Add sexualities to marginalized groups
marginalizedNouns = marginalizedNouns.concat(sexualities)

generateSentence = function () {
	var index = Math.floor(verbs.length * Math.random()),
	    sentence = sentences.random(),
	    subject = subjects.random(),
	    verb = verbs[index],
	    str = sentence.format

	str = str.replace('%subject', subject.names.random()).replace('%be', subject.be)
	str = str.replace('%verb', verb[sentence.forms.random()])
	str = str.replace('%complement', marginalizedNouns.random())
	str = str.replace('%person', ['people', 'aligned persons', 'persons', 'personalities'].random())
	str += sentence.type.randomRepeat(5)

	return str
}

generateInsult = function (initial) {
	var result = ''

	if (initial) {
		result += insults.random()
		result += ', you '

		if (randomBoolean()) {
			if (randomBoolean()) {
				result += insultAdverbs.random() + ' '
			}
			if (randomBoolean()) {
				result += marginalizedNouns.random() + '-' + marginalizedAdverbs.random() + ', '
			}
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

	result = result.replace(/%privilege/gi, randomPrivilege)

	return result.trim()
}

generateParagraph = function () {
	var result = [],
	    length = 3 + Math.random() * 10,
	    sentence, i

	result.push(generateInsult(true) + '!'.randomRepeat(10))

	for (i = 0; i < length; i += 1) {
		sentence = [
			generateInsult(false) + '!'.randomRepeat(5),
			generateSentence(),
			statements.random() + '!'.randomRepeat(10),
		].random().trim()

		sentence = sentence.replace(/%privilege/gi, randomPrivilege)
		sentence = sentence.replace(/%insult/gi, randomInsult)

		sentence = sentence.replace(/you are/g, function () {
			return randomBoolean() ? 'you\'re literally' : 'you\'re'
		})

		result.push(randomBoolean() ? sentence.toUpperCase() : sentence)
	}

	result = result.join(' ')

	result += '!'.randomRepeat(10)

	return result
}

$(document).ready(function () {
	$('#argument')
		.removeClass('loading')
		.text(generateInsult(true).toUpperCase())

	$('.controls button.generate-insult').click(function () {
		$('#argument').text(generateInsult(true).toUpperCase())
	})
	$('.controls button.generate-rant').click(function () {
		$('#argument').text(generateParagraph())
	})
})
