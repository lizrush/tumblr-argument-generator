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
	    'ethnicity', 'fat love', 'fat', 'fatist', 'fatty', 'female',
	    'feminist', 'genderfuck', 'genderless', 'body hair', 'height',
	    'indigenous', 'intersectionality', 'intersexual', 'invisible', 'kin',
	    'lesbianism', 'little person', 'marginalized', 'minority',
	    'multigender', 'non-gender', 'non-white', 'obesity', 'otherkin', 'omnisexual',
	    'pansexual', 'polygender', 'polyspecies', 'privilege', 'prosthetic', 'queer',
	    'radfem', 'skinny', 'smallfat', 'stretchmark', 'thin',
	    'third-gender', 'trans*', 'transethnic', 'transgender', 'transman',
	    'transwoman', 'trigger', 'two-spirit', 'womyn', 'wymyn', 'saami', 'native american',
	    'hijra', 'freeganist', 'transnormative', 'LGBTQIA+',
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
	    { forms: [2], format: 'you %insult, stop %verb %marginalize %person', type: '!', },
	    { forms: [2], format: 'you are a %marginalize %verb %insult', type: '!', },
	    { forms: [2], format: 'you should stop fucking %verb %marginalize %person', type: '!', },
	    { forms: [0], format: 'why the fuck do you feel the need to %verb %marginalize %person you %insult', type: '?', },
	    { forms: [0], format: 'leave %marginalize %person the fuck alone you %insult', type: '!', },
	    { forms: [2], format: 'stop fucking %verb %marginalize %person you %insult', type: '!', },
	    { forms: [0], format: 'what the fuck has %subject ever done to you you %insult', type: '!', },
    ],
    subjects = [
	    { names: ['s/he', 'he/she', 'xe', 'ze'], be: 'is', singular: 1 },
    ],
    intros = [
	    'wow. just. wow.',
	    'no. just. no.',
	    'this. is. NOT. okay!',
	    'just a friendly reminder:',
    ],
    statements = [
	    'you should be ashamed of yourself',
	    'you make me sick',
	    '%insult',
	    'stop offending me you %insult',
	    'you are the worst person alive',
	    'people like you should die',
	    'what the fuck do you have against gender abolition',
	    'you are worse than hitler',
	    'it\'s not my job to educate you you %insult',
	    'fuck your internalized misogyny',
	    'you\'re perpetuating rape culture you %insult',
	    'you\'re triggering me you %insult',
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

	str = str.replace(/%subject/gi, subject.names.random()).replace('%be', subject.be)
	str = str.replace(/%verb/gi, verb[sentence.forms.random()])
	str = str.replace(/%marginalize/gi, marginalizedNouns.random())
	str = str.replace(/%person/gi, ['identifying', 'aligned'].random() + ' ' + ['people', 'personalities'].random())
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
			result += marginalizedNouns.random() + '-' + marginalizedAdverbs.random() + ', '
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
	    sentence = '', i

	for (i = 0; i < length; i += 1) {
		if (i === 0) {
			if (randomBoolean()) {
				sentence += intros.random() + ' '
			}

			sentence += generateInsult(true) + '!'.randomRepeat(10)
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

		// Randomly make stuff literal
		sentence = sentence.replace(/you are/g, function () {
			return randomBoolean() ? 'you\'re literally' : 'you\'re'
		})

		// Randomly uppercase sentences
		sentence = randomBoolean() ? sentence.toUpperCase() : sentence

		result.push(sentence)
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
	$('.controls button.tumblrize-grammar').click(function () {
		var text = $('#argument').text()

		// Randomly add out-of-place commas
		text = text.replace(/\b /g, function () {
			return Math.random() > 0.05 ? ' ' : [',', '.'].random().randomRepeat(4)
		})

		// Randomly lowercase first characters
		text = text.replace(/([!?\.]\s+)(\w)/g, function (m, p1, p2) {
			return p1 + (Math.random() > 0.5 ? p2 : p2.toLowerCase())
		})

		// Randomly add tildes and asterisks around sentences
		text = text.replace(/(\w.+?)([!?\.]+)/g, function (m, p1, p2) {
			var wrap

			if (Math.random() > 0.8) {
				wrap = '~'.randomRepeat(5)
				if (Math.random() > 0.3) {
					wrap += '*'
				}
				return wrap + p1 + p2 + wrap.split('').reverse().join('')
			}

			return p1 + p2
		})

		// Convert you/you're, etc
		text = text.replace(/you're/g, 'ur')
		text = text.replace(/YOU'RE/g, 'UR')
		text = text.replace(/you/g, 'u')
		text = text.replace(/YOU/g, 'U')
		text = text.replace(/people/g, 'ppl')
		text = text.replace(/PEOPLE/g, 'PPL')

		// Add emoji faces
		text = text.replace(/([!?\.~]\s+)/gi, function (m, p1) {
			return p1 + (Math.random() > 0.8 ? emoji.random() : '')
		})

		$('#argument').text(text)
	})
})
