Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)]
}

String.prototype.randomRepeat = function (len) {
	return this + (new Array(Math.floor(Math.random() * (len - 1)))).join(this)
}

var generateSentence,
    generateInsult,
    generateParagraph,
    replaceTerms,
    randomBoolean,
    tumblrizeText,
    tumblrTerm,
    tumblrDictionary = {
	    description: [
		    'fucking',
		    'goddamn',
		    'damn',
	    ],
	    insult: [
		    'burn in hell',
		    'check your {privilegedNoun} privilege',
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
		    'light yourself on fire',
	    ],
	    insultAdverb: [
		    'deluded',
		    'fucking',
		    'ignorant',
		    'goddamn',
		    'judgemental',
		    'worthless',
		    'entitled',
		    'oppressive',
		    'pathetic',
	    ],
	    insultNoun: [
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
		    'lowlife',
	    ],
	    fullInsult: function () {
		    return [
			    tumblrTerm('insultAdverb') + ' ' + tumblrTerm('insultNoun'),
			    tumblrTerm('insultNoun'),
		    ].random()
	    },
	    marginalizedNoun: [
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
	    ].concat((function () {
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
	    })()),
	    marginalizedAdverb: [
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
		    'dehumanizing',
	    ],
	    marginalizedIsm: [
		    'feminist',
		    'fatist',
		    'racist',
		    'lesbianist',
		    'freeganist',
	    ],
	    privilegedNoun: [
		    'able-body',
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
	    privilegedAdverb: [
		    'privileged',
		    'overprivileged',
		    'normative',
	    ],
	    privilegedIsm: [
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
	    awesomeStuff: [
		    'gender abolition',
		    'female superiority',
	    ],
	    terribleStuff: [
		    'internalized misogynism',
		    'internalized patriarchy',
		    'male domination',
		    'gender roles',
		    'rape culture',
		    'institutionalized racism',
		    'patriarchal beauty standards',
	    ],
	    verb: [
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
		    ['dehumanize', 'dehumanizing', 'dehumanization'],
	    ],
	    sentence: [
		    { forms: [1], format: 'you {fullInsult}, stop {verb} {marginalizedNoun}-{personality}', type: '!', },
		    { forms: [1], format: 'you are a {marginalizedNoun}-{verb} {fullInsult}', type: '!', },
		    { forms: [1], format: 'you should stop fucking {verb} {marginalizedNoun}-{personality}', type: '!', },
		    { forms: [0], format: 'why the fuck do you feel the need to {verb} {marginalizedNoun}-{personality} you {fullInsult}', type: '?', },
		    { forms: [0], format: 'leave {marginalizedNoun}-{personality} the fuck alone you {fullInsult}', type: '!', },
		    { forms: [1], format: 'stop fucking {verb} {marginalizedNoun}-{personality} you {fullInsult}', type: '!', },
		    { forms: [0], format: 'what the fuck has {subject} ever done to you you {fullInsult}', type: '!', },
		    { forms: [2], format: 'your {verb} of {marginalizedNoun}-{personality} is problematic', type: '!', },
		    { forms: [2], format: 'your {terribleStuff} keeps me from having any {description} rights', type: '!', },
	    ],
	    subject: [
		    'xe',
		    'ze',
		    'zhe',
		    'zie',
		    'they',
	    ],
	    intro: [
		    'wow. just. wow.',
		    'no. just. no.',
		    'this. is. NOT. okay.',
		    'just a friendly reminder:',
		    '[TW: rant]',
		    'oh. my. god.',
	    ],
	    statement: [
		    'you should be ashamed of yourself',
		    'you make me sick',
		    'oh my god',
		    '{fullInsult}',
		    'die in a fire',
		    'stop offending me you {fullInsult}',
		    'you are the worst person alive',
		    'people like you deserve to die',
		    'what the fuck do you have against {awesomeStuff} you {fullInsult}',
		    'you are worse than hitler',
		    'it\'s not my job to educate you you {fullInsult}',
		    'fuck your {description} {terribleStuff}',
		    'you are perpetuating {terribleStuff} you {fullInsult}',
		    'you are triggering me you {fullInsult}',
		    'stop tone policing me you {fullInsult}',
		    'i hope you fucking die you {fullInsult}',
		    'why the FUCK should i respect your {description} opinion',
		    'please address me as "{subject}" you inconsiderate {fullInsult}',
	    ],
	    emoji: [
		    '(◕﹏◕✿)',
		    '（　｀ー´）',
		    '(•﹏•)',
		    '└(｀0´)┘',
		    'ᕙ(⇀‸↼‶)ᕗ',
		    'ᕦ(ò_óˇ)ᕤ',
		    '(⋋▂⋌)',
		    '(¬_¬)',
		    '٩(×̯×)۶',
	    ],
	    personality: (function () {
		    var result = [],
		        prefixes = [
			        'identifying',
			        'aligned',
			        'type',
		        ],
		        postfixes = [
			        'people',
			        'personalities',
			        'individuals',
		        ]

		    $.each(prefixes, function (i, pre) {
			    $.each(postfixes, function (i, post) {
				    result.push(pre + ' ' + post)
			    })
		    })

		    return result
	    })(),
	    conclusion: [
		    'in conclusion:',
		    'to summarize:',
		    'tl;dr',
	    ]
    }

replaceTerms = function (text) {
	return text.replace(/\{([a-z]+)\}/gi, function (m, p1) {
		return tumblrTerm(p1)
	})
}

tumblrizeText = function (text, uppercase) {
	var wrap

	// Randomly add out-of-place commas
	text = text.replace(/\b /g, function () {
		return Math.random() > 0.05 ? ' ' : [',', '.'].random().randomRepeat(4)
	})

	// Randomly add tildes and asterisks around text
	if (Math.random() > 0.8) {
		wrap = '~'.randomRepeat(5)
		if (Math.random() > 0.3) {
			wrap += '*'
		}
		text = wrap + text + wrap.split('').reverse().join('')
	}

	// Convert you/you're, etc
	text = text.replace(/you're/g, 'ur')
	text = text.replace(/you/g, 'u')
	text = text.replace(/people/g, 'ppl')
	text = text.replace(/please/g, 'plz')
	text = text.replace(/e([dr])\b/g, function (m, p1) {
		return (Math.random() > 0.4 ? 'e' + p1 : p1)
	})

	if (uppercase) {
		text = text.toUpperCase()
	}

	// Randomly lowercase first characters
	text = text.replace(/^(\w)/g, function (m, p1) {
		return Math.random() > 0.3 ? p1 : p1.toLowerCase()
	})

	// Add emoji faces
	if (Math.random() > 0.8) {
		text += ' ' + tumblrTerm('emoji')
	}

	return text
}

tumblrTerm = function (type) {
	var ret = tumblrDictionary[type]
	if (typeof ret === 'undefined') {
		console.log('Unknown term: ' + type)
		return '[undefined]'
	}
	if (typeof ret === 'function') {
		return ret()
	}
	return ret.random()
}

randomBoolean = function () {
	return Math.round(Math.random()) === 1
}

generateSentence = function () {
	var sentence = tumblrTerm('sentence'),
	    verb = tumblrTerm('verb')

	return sentence.format.replace(/{verb}/gi, verb[sentence.forms.random()]) + sentence.type.randomRepeat(10)
}

generateInsult = function (initial, tumblrize) {
	var insult = ''

	if (initial) {
		insult += tumblrTerm('insult')
		insult += ', you '

		if (Math.random() > 0.3) {
			insult += tumblrTerm('insultAdverb') + ' '
		}
		if (Math.random() > 0.3) {
			insult += [tumblrTerm('marginalizedIsm'), tumblrTerm('marginalizedNoun')].random() + '-' + tumblrTerm('marginalizedAdverb') + ', '
		}
	}
	else {
		insult += 'you '
	}

	insult += tumblrTerm('privilegedNoun') + '-' + tumblrTerm('privilegedAdverb') + ' '
	insult += [tumblrTerm('insultNoun'), tumblrTerm('privilegedIsm')].random() + ' '

	insult = replaceTerms(insult)

	if (tumblrize) {
		insult = tumblrizeText(insult)
	}

	return insult.trim()
}

generateParagraph = function (tumblrize) {
	var paragraph = [],
	    length = 3 + Math.random() * 7,
	    sentence, i

	for (i = 0, sentence = ''; i < length; i += 1) {
		if (i === 0) {
			if (Math.random() > 0.3) {
				sentence += tumblrTerm('intro') + ' '
			}

			sentence += generateInsult(true) + '!'.randomRepeat(10)
		}
		else {
			sentence = [
				generateInsult(false) + '!'.randomRepeat(10),
				generateSentence(),
				tumblrTerm('statement') + '!'.randomRepeat(10),
			].random().trim()
		}

		sentence = replaceTerms(sentence)

		// Randomly make stuff literal
		sentence = sentence.replace(/you are/g, function () {
			return (Math.random() > 0.2 ? 'you\'re literally' : 'you\'re')
		})

		if (tumblrize) {
			sentence = tumblrizeText(sentence, randomBoolean())
		}
		else if (randomBoolean()) {
			// Randomly uppercase sentences
			sentence = sentence.toUpperCase()
		}

		paragraph.push(sentence)
	}

	paragraph = paragraph.join(' ') + '!'.randomRepeat(10)

	if (randomBoolean()) {
		paragraph += ' ' + tumblrTerm('conclusion') + ' ' + replaceTerms(tumblrTerm('insult')).toUpperCase() + '!'.randomRepeat(10)
	}

	return paragraph.trim()
}

$(document).ready(function () {
	$('#argument')
		.removeClass('loading')
		.text(generateInsult(true, $('#tumblrize-grammar').prop('checked')).toUpperCase())

	$('.controls button.generate-insult').click(function () {
		$('#argument').text(generateInsult(true, $('#tumblrize-grammar').prop('checked')).toUpperCase())
	})
	$('.controls button.generate-rant').click(function () {
		$('#argument').text(generateParagraph($('#tumblrize-grammar').prop('checked')))
	})
})
