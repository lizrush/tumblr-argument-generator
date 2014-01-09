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
		    'damn',
		    'fucking',
		    'goddamn',
	    ],
	    insult: [
		    'burn in hell',
		    'check your {privilegedNoun} privilege',
		    'die in a fire',
		    'drop dead',
		    'fuck off',
		    'fuck you',
		    'go drown in your own piss',
		    'go play in traffic',
		    'kill yourself',
		    'light yourself on fire',
		    'make love to yourself in a furnace',
		    'please die',
		    'rot in hell',
		    'screw you',
		    'shut the fuck up',
		    'shut up',
	    ],
	    insultAdverb: [
		    'deluded',
		    'entitled',
		    'fucking',
		    'goddamn',
		    'ignorant',
		    'inconsiderate',
		    'judgemental',
		    'oppressive',
		    'pathetic',
		    'worthless',
	    ],
	    insultNoun: [
		    'MRA',
		    'asshole',
		    'basement dweller',
		    'bigot',
		    'brogrammer',
		    'creep',
		    'dudebro',
		    'fascist',
		    'hitler',
		    'lowlife',
		    'nazi',
		    'neckbeard',
		    'oppressor',
		    'pedophile',
		    'piece of shit',
		    'rape-apologist',
		    'rapist',
		    'redditor',
		    'scum',
		    'subhuman',
		    'virgin',
		    'TERF',
		    'radscum',
		    'femscum',
		    'feminazi',
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
		    'hijra', 'transnormative', 'LGBTQIA+', 'multiple system', 'headmate',
		    'cross-dresser', 'androphilia', 'gynephilia', 'PoC', 'WoC', 'CAMAB', 'CAFAB', 'QTPOC',
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
		    'antediluvian',
		    'attacking',
		    'chauvinistic',
		    'close-minded',
		    'dehumanizing',
		    'denying',
		    'discriminating',
		    'hypersexualizing',
		    'ignoring',
		    'intolerant',
		    'misogynistic',
		    'nphobic',
		    'objectifying',
		    'oppressive',
		    'patriarchal',
		    'phobic',
		    'racist',
		    'rape-culture-supporting',
		    'sexist',
		    'sexualizing',
		    'shaming',
		    'ciscentric',
	    ],
	    marginalizedIsm: [
		    'fatist',
		    'feminist',
		    'freeganist',
		    'lesbianist',
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
		    'uterus-bearer',
	    ],
	    privilegedAdverb: [
		    'normative',
		    'overprivileged',
		    'privileged',
	    ],
	    privilegedIsm: [
		    'ableist',
		    'ageist',
		    'anti-feminist',
		    'chauvinist',
		    'classist',
		    'kyriarchist',
		    'misogynist',
		    'nazi',
		    'patriarchist',
		    'sexist',
		    'transmisogynist',
		    'assimilationist',
		    'essentialist',
	    ],
	    awesomeStuff: [
		    'female rights',
		    'female superiority',
		    'gender abolition',
	    ],
	    terribleStuff: [
		    'gender roles',
		    'institutionalized racism',
		    'internalized misogynism',
		    'internalized patriarchy',
		    'male domination',
		    'patriarchal beauty standards',
		    'rape culture',
		    'TERFism',
	    ],
	    verb: [
		    ['abuse', 'abusing', 'abuse'],
		    ['attack', 'attacking', 'attacking'],
		    ['dehumanize', 'dehumanizing', 'dehumanization'],
		    ['deny', 'denying', 'denial'],
		    ['discriminate', 'discriminating', 'discrimination'],
		    ['hypersexualize', 'hypersexualizing', 'hypersexualization'],
		    ['ignore', 'ignoring', 'ignoring'],
		    ['marginalize', 'marginalizing', 'marginalization'],
		    ['objectify', 'objectifying', 'objectification'],
		    ['oppress', 'oppressing', 'oppression'],
		    ['sexualize', 'sexualizing', 'sexualization'],
		    ['shame', 'shaming', 'shaming'],
		    ['kinkshame', 'kinkshaming', 'kinkshaming'],
		    ['harass', 'harassing', 'harassment'],
		    ['misgender', 'misgendering', 'misgendering'],
	    ],
	    sentence: [
		    { forms: [0], format: 'why the fuck do you feel the need to {verb} {marginalizedNoun}-{personality}', type: '?', },
		    { forms: [1], format: 'stop fucking {verb} {marginalizedNoun}-{personality}', type: '!', },
		    { forms: [1], format: 'you are a {marginalizedNoun}-{verb} {fullInsult}', type: '!', },
		    { forms: [1], format: 'you should stop fucking {verb} {marginalizedNoun}-{personality}', type: '!', },
		    { forms: [1], format: 'stop {verb} {marginalizedNoun}-{personality}', type: '!', },
		    { forms: [2], format: 'your {verb} of {marginalizedNoun}-{personality} is problematic', type: '!', },
	    ],
	    subject: [
		    'they',
		    'xe',
		    'ze',
		    'zhe',
		    'zie',
		    'hir',
	    ],
	    intro: [
		    '[TW: rant]',
		    'just a friendly reminder:',
		    'no. just. no.',
		    'oh. my. god.',
		    'this. is. NOT. okay.',
		    'wow. just. wow.',
		    'can we talk about this?',
		    'i\'m going to get hate for this but',
		    'seriously?',
	    ],
	    statement: [
		    'die in a fire!',
		    'fuck off!',
		    'fuck your {description} {terribleStuff}!',
		    'fucking address me as "{subject}"!',
		    'i hope you fucking die!',
		    'it\'s not my job to educate you!',
		    'leave {marginalizedNoun}-{personality} the fuck alone!',
		    'oh my god!',
		    'people like you deserve to die!',
		    'stop offending me!',
		    'stop tone policing me!',
		    'what the fuck do you have against {awesomeStuff}!',
		    'what the fuck has {subject} ever done to you?',
		    'why the FUCK should i respect your {description} opinion?',
		    'you are perpetuating {terribleStuff}!',
		    'you are the worst person alive!',
		    'you are triggering me!',
		    'you are worse than hitler!',
		    'you make me sick!',
		    'you should be ashamed of yourself!',
		    'your {terribleStuff} keeps me from having any {description} rights!',
		    'i am 100% done.',
		    'i can\'t even.'
	    ],
	    fullStatement: function () {
		    var rawStatement = tumblrTerm('statement'),
		        statement = rawStatement.slice(0, -1),
		        punctuation = rawStatement.slice(-1)

		    return statement + (randomBoolean() ? ' you ' + tumblrTerm('fullInsult') : '') + punctuation.randomRepeat(10)
	    },
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
		    '(╯°□°)╯︵ ┻━┻',
		    '(⊙﹏⊙✿)',
		    '(ﾉ◕ヮ◕)ﾉ*: ･ﾟ✧',
		    '(⊙_◎)',
	    ],
	    conclusion: [
		    'in conclusion:',
		    'tl;dr',
		    'to summarize:',
	    ],
	    personality: (function () {
		    var result = [],
		        prefixes = [
			        'aligned',
			        'identifying',
			        'type',
		        ],
		        postfixes = [
			        'individuals',
			        'people',
			        'personalities',
		        ]

		    $.each(prefixes, function (i, pre) {
			    $.each(postfixes, function (i, post) {
				    result.push(pre + ' ' + post)
			    })
		    })

		    return result
	    })(),
    }

replaceTerms = function (text) {
	return text.replace(/\{([a-z]+)\}/gi, function (m, p1) {
		return tumblrTerm(p1)
	})
}

tumblrizeText = function (text, uppercase) {
	var wrap, randomPoint

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
	text = text.replace(/([^e])e([dr])\b/g, function (m, p1, p2) {
		return (Math.random() > 0.4 ? p1 + 'e' + p2 : p1 + p2)
	})

	// Remove apostrophes
	text = text.replace(/'/g, '')

	if (uppercase) {
		text = text.toUpperCase()
	}

	// Randomly lowercase first characters
	if (Math.random() > 0.2) {
		randomPoint = Math.floor(Math.random() * (text.length / 3))
		text = text.slice(0, randomPoint).toLowerCase() + text.slice(randomPoint, text.length)
	}

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

	return sentence.format.replace(/{verb}/gi, verb[sentence.forms.random()]) + (randomBoolean() ? ' you ' + tumblrTerm('fullInsult') : '') + sentence.type.randomRepeat(10)
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
			sentence += tumblrTerm('intro') + ' '
			sentence += generateInsult(true) + '!'.randomRepeat(10)
		}
		else {
			sentence = [
				generateInsult(false) + '!'.randomRepeat(10),
				generateSentence(),
				tumblrTerm('fullStatement'),
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
		else if (Math.random() > 0.3) {
			// Randomly uppercase sentences
			sentence = sentence.toUpperCase()
		}

		paragraph.push(sentence)
	}

	paragraph = paragraph.join(' ') + '!'.randomRepeat(10)

	if (randomBoolean()) {
		paragraph += ' ' + tumblrTerm('conclusion') + ' ' + replaceTerms(tumblrTerm('insult') + (randomBoolean() ? ' you ' + tumblrTerm('fullInsult') : '')).toUpperCase() + '!'.randomRepeat(10)
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
