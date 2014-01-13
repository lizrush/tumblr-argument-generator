Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)]
}

String.prototype.randomRepeat = function (len) {
	return (new Array(Math.floor(2 + (Math.random() * (len - 1))))).join(this)
}

var generateInsult,
    generateParagraph,
    generateUsername,
    replaceTerms,
    literalize,
    weightedArray,
    tumblrizeText,
    tumblrTerm,
    tumblrDictionary = {
	    description: [
		    'damn',
		    'fucking',
		    'goddamn',
	    ],
	    insult: [
		    'acknowledge your {privilegedNoun} privilege',
		    'burn in hell',
		    'check your {privilegedNoun} privilege',
		    'die in a ditch',
		    'die in a fire',
		    'drop dead',
		    'fuck off',
		    'fuck you',
		    'go drown in your own piss',
		    'go fuck yourself',
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
	    insultAdjective: [
		    'antediluvian',
		    'awful',
		    'body-shaming',
		    'chauvinistic',
		    'ciscentric',
		    'close-minded',
		    'deluded',
		    'entitled',
		    'fucking',
		    'goddamn',
		    'heteropatriarchal',
		    'ignorant',
		    'inconsiderate',
		    'insensitive',
		    'intolerant',
		    'judgmental',
		    'misogynistic',
		    'nphobic',
		    'oppressive',
		    'pathetic',
		    'patriarchal',
		    'racist',
		    'rape-culture-supporting',
		    'sexist',
		    'worthless',
	    ].concat((function () {
		    var result = [],
		        phobias = [
			        'ace',
			        'bi',
			        'chubby',
			        'color',
			        'curvy',
			        'deathfat',
			        'demi',
			        'diversity',
			        'ethnicity',
			        'fat',
			        'fatty',
			        'female',
			        'femi',
			        'feminist',
			        'furry',
			        'homo',
			        'latin@',
			        'minority',
			        'multigender',
			        'otherkin',
			        'queer',
			        'smallfat',
			        'stretchmark',
			        'trans',
			        'trans*',
			        'womyn',
			        'wymyn',
		        ]

		    $.each(phobias, function (i, phobia) {
			    result.push(phobia + 'phobic')
		    })

		    return result
	    })()),
	    insultNoun: [
		    'MRA',
		    'TERF',
		    'ableist',
		    'ageist',
		    'anti-feminist',
		    'asshole',
		    'assimilationist',
		    'basement dweller',
		    'bigot',
		    'binarist',
		    'brogrammer',
		    'carnist',
		    'chauvinist',
		    'cissexist',
		    'classist',
		    'creep',
		    'dudebro',
		    'essentialist',
		    'fascist',
		    'feminazi',
		    'femscum',
		    'hitler',
		    'kyriarchist',
		    'lowlife',
		    'misogynist',
		    'mouthbreather',
		    'nazi',
		    'neckbeard',
		    'oppressor',
		    'patriarchist',
		    'pedophile',
		    'piece of shit',
		    'radscum',
		    'rape-apologist',
		    'rapist',
		    'redditor',
		    'scum',
		    'sexist',
		    'subhuman',
		    'traditionalist',
		    'transmisogynist',
		    'virgin',
	    ],
	    fullInsult: function () {
		    return (Math.random() > 0.3 ? tumblrTerm('insultAdjective') + ' ' : '') + tumblrTerm('insultNoun')
	    },
	    marginalized: {
		    verb: {
			    concept: [
				    ['abuse', 'abusing', 'abuse'],
				    ['attack', 'attacking', 'attacking'],
				    ['deny', 'denying', 'denial'],
				    ['discriminate', 'discriminating', 'discrimination'],
				    ['exotify', 'exotifying', 'exotification'],
				    ['fetishize', 'fetishizing', 'fetishization'],
				    ['ignore', 'ignoring', 'ignoring'],
				    ['marginalize', 'marginalizing', 'marginalization'],
				    ['oppress', 'oppressing', 'oppression'],
				    ['shame', 'shaming', 'shaming'],
			    ],
			    person: [
				    ['abuse', 'abusing', 'abuse'],
				    ['attack', 'attacking', 'attacking'],
				    ['dehumanize', 'dehumanizing', 'dehumanization'],
				    ['deny', 'denying', 'denial'],
				    ['discriminate', 'discriminating', 'discrimination'],
				    ['exotify', 'exotifying', 'exotification'],
				    ['fetishize', 'fetishizing', 'fetishization'],
				    ['harass', 'harassing', 'harassment'],
				    ['hypersexualize', 'hypersexualizing', 'hypersexualization'],
				    ['ignore', 'ignoring', 'ignoring'],
				    ['kinkshame', 'kinkshaming', 'kinkshaming'],
				    ['marginalize', 'marginalizing', 'marginalization'],
				    ['misgender', 'misgendering', 'misgendering'],
				    ['objectify', 'objectifying', 'objectification'],
				    ['oppress', 'oppressing', 'oppression'],
				    ['sexualize', 'sexualizing', 'sexualization'],
				    ['shame', 'shaming', 'shaming'],
				    ['stare-rape', 'stare-raping', 'stare-raping'],
			    ],
		    },
		    noun: {
			    concept: [
				    'activism',
				    'androphilia',
				    'attractiveness',
				    'body hair',
				    'color',
				    'communism',
				    'diversity',
				    'dysphoria',
				    'egalitarianism',
				    'ethnicity',
				    'fandom',
				    'fat love',
				    'fatism',
				    'feminism',
				    'food addiction',
				    'freeganism',
				    'gynephilia',
				    'height',
				    'intersectionality',
				    'intersexuality',
				    'invisibility',
				    'lesbianism',
				    'minority',
				    'multiplicity',
				    'privilege',
				    'stretchmark',
				    'socialism',
				    'underprivileged',
				    'veganism',
				    'vegetarianism',
			    ],
			    person: [
				    'CAFAB',
				    'CAMAB',
				    'LGBTQIAP+',
				    'PoC',
				    'QTPOC',
				    'WoC',
				    'ace',
				    'appearance',
				    'asian',
				    'bi',
				    'prosthetic',
				    'black',
				    'celestial',
				    'chubby',
				    'closet',
				    'cross-dresser',
				    'curvy',
				    'deathfat',
				    'demi',
				    'differently abled',
				    'disabled',
				    'ethnic',
				    'estrogen-affinity',
				    'fat',
				    'fatty',
				    'female',
				    'furry',
				    'genderless',
				    'graysexual',
				    'headmate',
				    'hijra',
				    'indigenous',
				    'latin@',
				    'little person',
				    'multigender',
				    'non-gender',
				    'non-white',
				    'obesity',
				    'princex',
				    'queer',
				    'skinny',
				    'smallfat',
				    'survivor',
				    'radfem',
				    'therian',
				    'native american',
				    'thin',
				    'third-gender',
				    'trans*',
				    'transabled',
				    'transman',
				    'transnormative',
				    'transwoman',
				    'vegan',
				    'vegetarian',
				    'two-spirit',
				    'womyn',
				    'victim',
				    'wymyn',
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
					        'fuck',
					        'queer',
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
					        'trans',
				        ],
				        sexualPostfixes = [
					        'ethnic',
					        'gender',
					        'queer',
					        'racial',
					        'romantic',
					        'sexual',
					        'species',
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
			    })()).concat((function () {
				    var result = [],
				        kins = [
					        '',
					        'cat',
					        'dog',
					        'dragon',
					        'other',
				        ]

				    $.each(kins, function (i, kin) {
					    result.push(kin + 'kin')
				    })

				    return result
			    })()),
		    },
	    },
	    privilegedNoun: [
		    'able-body',
		    'binary',
		    'cis',
		    'cisgender',
		    'cishet',
		    'college-educated',
		    'gender',
		    'hetero',
		    'male',
		    'middle-class',
		    'smallfat',
		    'thin',
		    'uterus-bearer',
		    'white',
	    ],
	    privilegedAdjective: [
		    'normative',
		    'elitist',
		    'overprivileged',
		    'privileged',
	    ],
	    awesomeStuff: [
		    'bodily integrity',
		    'egalitarianism',
		    'female rights',
		    'female superiority',
		    'female supremacy',
		    'femininity',
		    'feminism',
		    'gender abolition',
		    'misandry',
		    'social justice',
	    ],
	    terribleStuff: [
		    'TERFism',
		    'bindi wearing',
		    'colonization',
		    'cultural appropriation',
		    'erosion of female self esteem',
		    'exotification',
		    'gender equality',
		    'gender roles',
		    'hypermasculinity',
		    'institutionalized racism',
		    'internalized misogynism',
		    'internalized patriarchy',
		    'labeling',
		    'male domination',
		    'male entitlement',
		    'masculinity',
		    'men\'s rights',
		    'patriarchal beauty standards',
		    'rape culture',
		    'sexuality labels',
		    'white feminism',
		    'white opinions',
	    ],
	    sentence: [
		    { forms: [0], format: 'why the fuck do you feel the need to {verb} {marginalized}?' },
		    { forms: [1], format: 'don\'t you see that {verb} {marginalized} is problematic?' },
		    { forms: [1], format: 'stop fucking {verb} {marginalized}!' },
		    { forms: [1], format: 'stop {verb} {marginalized}!' },
		    { forms: [1], format: 'you are a {marginalized}-{verb} {fullInsult}!' },
		    { forms: [1], format: 'you should stop fucking {verb} {marginalized}!' },
		    { forms: [2], format: 'fuck your {verb} of {marginalized}!' },
		    { forms: [2], format: 'your {verb} of {marginalized} is problematic!' },
	    ],
	    fullSentence: function () {
		    var rawSentence = tumblrTerm('sentence'),
		        sentence = rawSentence.format.slice(0, -1),
		        punctuation = rawSentence.format.slice(-1),
		        type = ['person', 'concept'].random()

		    sentence = sentence.replace(/{verb}/gi, tumblrDictionary.marginalized.verb[type].random()[rawSentence.forms.random()])
		    sentence = sentence.replace(/{marginalized}/gi, function () {
			    if (type === 'person') {
				    return tumblrDictionary.marginalized.noun[type].random() + '-' + tumblrTerm('identifyingPerson')
			    }
			    return tumblrDictionary.marginalized.noun[type].random() + '-' + tumblrTerm('supportingPerson')
		    })
		    sentence += (Math.random() > 0.4 ? ' you ' + tumblrTerm('fullInsult') : '')
		    sentence += punctuation

		    return sentence
	    },
	    pronoun: [
		    // Yes, these are real: http://en.wikipedia.org/wiki/Gender-specific_and_gender-neutral_pronouns#Summary
		    ['ey', 'em', 'eir'],
		    ['tho', 'thong', 'thors'],
		    ['hu', 'hum', 'hus'],
		    ['thon', 'thon', 'thons'],
		    ['jee', 'jem', 'jeir'],
		    ['ve', 'ver', 'vis'],
		    ['xe', 'xem', 'xyr'],
		    ['ze', 'zir', 'zes'],
		    ['ze', 'hir', 'hir'],
		    ['ze', 'mer', 'zer'],
		    ['zhe', 'zhim', 'zher'],
	    ],
	    pronouns: function () {
		    return tumblrTerm('pronoun').join('/')
	    },
	    intro: [
		    '[TW: rant]',
		    '[TW: words]',
		    'can we talk about this?',
		    'first off:',
		    'for the love of god.',
		    'i\'m going to get hate for this but',
		    'just a friendly reminder:',
		    'let me make this abundantly clear:',
		    'no. just. no.',
		    'oh. my. god.',
		    'omg',
		    'please stop.',
		    'seriously?',
		    'this. is. NOT. okay.',
		    'wow. just. wow.',
	    ],
	    statement: [
		    '"{privilegedNoun}" is extremely triggering to me!',
		    '"{privilegedNoun}" is literally a trigger word for me!',
		    'consensual sex is still rape!',
		    'die in a fire!',
		    'fuck off!',
		    'fuck your {description} {terribleStuff}!',
		    'fucking address me as "{pronouns}"!',
		    'fucking respect my {awesomeStuff}!',
		    'get off my {description} case or i will report you for harassment!',
		    'i am 100% done.',
		    'i am crying right now!',
		    'i can\'t even.',
		    'i don\'t need your {description} advice!',
		    'i hope you fucking die!',
		    'it is not my job to educate you!',
		    'leave {marginalized} the fuck alone!',
		    'my pronouns are "{pronouns}"!',
		    'no one cares about your {description} {insultNoun} {privilegedNoun} opinion!',
		    'obesity ≠ unhealthy!',
		    'oh my god!',
		    'omg.',
		    'people like you deserve to die!',
		    'stop offending me!',
		    'stop tone policing me!',
		    'what the fuck do you have against {awesomeStuff}?',
		    'why the FUCK should i respect your {description} {insultNoun} opinion?',
		    'you are making me cry!',
		    'you are perpetuating {terribleStuff}!',
		    'you are the worst person alive!',
		    'you are triggering me!',
		    'you are worse than hitler!',
		    'you can be fat and healthy!',
		    'you make me sick!',
		    'you should be ashamed of yourself!',
		    'you will never understand my {description} {marginalized} struggles!',
		    'your {description} {insultNoun} {privilegedNoun}-privileged opinion is worthless!',
		    'your {terribleStuff} is problematic!',
		    'your {terribleStuff} keeps me from having any {description} rights!',
		    '{terribleStuff} is so {description} annoying!',
	    ],
	    fullStatement: function () {
		    var rawStatement = tumblrTerm('statement'),
		        statement = rawStatement.slice(0, -1),
		        punctuation = rawStatement.slice(-1),
		        type = ['person', 'concept'].random()

		    statement = statement.replace(/{marginalized}/gi, function () {
			    if (type === 'person') {
				    return tumblrDictionary.marginalized.noun[type].random() + '-' + tumblrTerm('identifyingPerson')
			    }
			    return tumblrDictionary.marginalized.noun[type].random() + '-' + tumblrTerm('supportingPerson')
		    })
		    statement += Math.random() > 0.4 && punctuation !== '.' ? ' you ' + tumblrTerm('fullInsult') : ''
		    statement += punctuation

		    return statement
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
	    identifyingPerson: (function () {
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
	    supportingPerson: (function () {
		    var result = [],
		        prefixes = [
			        'aligned',
			        'supporting',
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
    },
    backgroundImages = [
	    '1.gif',
	    '5.gif',
	    '1.jpg',
	    '2.jpg',
	    '3.jpg',
	    '4.jpg',
	    '5.jpg',
	    '6.jpg',
	    '7.jpg',
	    '8.jpg',
	    '9.jpg',
    ]

replaceTerms = function (text) {
	return text.replace(/\{([a-z]+)\}/gi, function (m, p1) {
		return tumblrTerm(p1)
	})
}

literalize = function (text) {
	text = text.replace(/you are/g, function () {
		return (Math.random() > 0.2 ? 'you\'re literally' : 'you\'re')
	})
	text = text.replace(/i am/g, function () {
		return (Math.random() > 0.2 ? 'i\'m literally' : 'i\'m')
	})
	text = text.replace(/ will/g, function () {
		return (Math.random() > 0.2 ? '\'ll literally' : '\'ll')
	})
	text = text.replace(/it is/g, function () {
		return (Math.random() > 0.2 ? 'it\'s literally' : 'it\'s')
	})

	return text
}

tumblrizeText = function (text, uppercase) {
	var wrap, randomPoint

	// Randomly remove existing commas
	text = text.replace(/,/g, function () {
		return Math.random() > 0.3 ? '' : ','
	})

	// Randomly add out-of-place punctuation
	text = text.replace(/\b /g, function () {
		return Math.random() > 0.05 ? ' ' : [', ', '. '].random()
	})

	// Randomly remove all punctuation
	text = text.replace(/([\.,\!\?:])/g, function (m, p1) {
		return Math.random() > 0.5 ? '' : p1
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

	// Remove all apostrophes
	text = text.replace(/'/g, '')

	if (uppercase) {
		text = text.toUpperCase()
	}

	// Randomly lowercase first characters
	randomPoint = Math.floor(Math.random() * (text.length / 3))
	text = text.slice(0, randomPoint).toLowerCase() + text.slice(randomPoint, text.length)

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

weightedArray = function (array, weights) {
	var ret = [],
	    i, j, multiples

	for (i = 0; i < weights.length; i += 1) {
		multiples = weights[i] * 10

		for (j = 0; j < multiples; j += 1) {
			ret.push(array[i])
		}
	}

	return ret
}

generateInsult = function (initial, tumblrize) {
	var insult = '',
	    type = ['person', 'concept'].random()

	if (initial) {
		insult += tumblrTerm('insult')
		insult += ', you '

		if (Math.random() > 0.3) {
			insult += tumblrTerm('insultAdjective') + ' '
		}
		if (Math.random() > 0.3) {
			insult += tumblrDictionary.marginalized.noun[type].random()
			insult += '-' + tumblrDictionary.marginalized.verb[type].random()[1] + ', '
		}
	}
	else {
		insult += 'you '
	}

	insult += tumblrTerm('privilegedNoun') + '-' + tumblrTerm('privilegedAdjective') + ' '
	insult += tumblrTerm('insultNoun') + ' '

	insult = replaceTerms(insult)

	if (tumblrize) {
		insult = tumblrizeText(insult)
	}

	return insult.trim()
}

generateParagraph = function (tumblrize, minLength, maxRandom) {
	var paragraph = [],
	    length = (typeof minLength === 'undefined' ? 3 : minLength) + Math.random() * (typeof maxRandom === 'undefined' ? 7 : maxRandom),
	    sentenceGenerators = weightedArray([
		    function () { return generateInsult(false) + '!' },
		    function () { return generateInsult(true) + '!' },
		    function () { return tumblrTerm('fullSentence') },
		    function () { return tumblrTerm('fullStatement') },
	    ], [
		    0.1,
		    0.1,
		    0.3,
		    0.5,
	    ]),
	    sentence, i

	for (i = 0, sentence = ''; i < length; i += 1) {
		if (i === 0) {
			sentence = tumblrTerm('intro') + ' '
		}
		else {
			sentence = sentenceGenerators.random()().trim()
		}

		sentence = replaceTerms(sentence)

		// Randomly make stuff literal
		sentence = literalize(sentence)

		// Replace "and" with ampersand
		sentence = sentence.replace(/\band\b/g, '&')

		if (tumblrize) {
			sentence = tumblrizeText(sentence, Math.random() > 0.4)
		}
		else if (Math.random() > 0.4) {
			// Randomly uppercase sentences
			sentence = sentence.toUpperCase()
		}

		paragraph.push(sentence)
	}

	paragraph = paragraph.join(' ')

	if (Math.random() > 0.5) {
		paragraph += ' ' + tumblrTerm('conclusion') + ' ' + replaceTerms(tumblrTerm('insult') + (Math.random() > 0.5 ? ' you ' + tumblrTerm('fullInsult') : '')).toUpperCase() + '!'
	}

	// Randomly repeat punctuation
	paragraph = paragraph.replace(/([\!\?]+)/g, function (m, p1) {
		return p1.slice(0, 1).randomRepeat(10)
	})

	return paragraph.trim()
}

generateUsername = function() {
	return (tumblrDictionary.marginalized.noun.person.random() + tumblrDictionary.marginalized.noun.person.random()).toLowerCase().replace(/[^a-z]/g, '')
}

$(document).ready(function () {
	var currentBackgroundImage = backgroundImages.random(),
	    renderInsult,
	    renderWar,
	    updateBackground

	renderInsult = function () {
		var tumblrize = $('#tumblrize-grammar').prop('checked'),
		    insult = $('<p>').text(generateInsult(true, tumblrize).toUpperCase())

		$('#argument').empty().append(insult).attr('class', 'insult')
	}

	renderWar = function () {
		var tumblrize = $('#tumblrize-grammar').prop('checked'),
		    numReplies = $('#num-replies').val(),
		    war = $('<p/>').text(generateParagraph(tumblrize)),
		    i, username, blockquote, reply

		for (i = 0; i < numReplies; i += 1) {
			username = $('<p/>').text(generateUsername() + ':').attr('class', 'username')
			blockquote = $('<blockquote/>').append(war)
			reply = $('<p/>').text(Math.random() > 0.6 ? generateParagraph(tumblrize, 3, 0) : generateInsult(true, tumblrize).toUpperCase())

			war = $('<div/>').append(username).append(blockquote).append(reply)
		}

		$('#argument').empty().append(war).attr('class', 'war')
	}

	updateBackground = function () {
		if ($('#tumblrize-grammar').prop('checked')) {
			$('body').addClass('tumblrized')
			if ($('body').css('background-image').indexOf(currentBackgroundImage) === -1) {
				$('body').css('background-image', 'url(static/img/bg/' + currentBackgroundImage + ')')
			}
		}
		else {
			$('body').removeClass('tumblrized').css('background-image', 'none')
		}
	}

	// Randomly switch background now and then
	window.setInterval(function () { currentBackgroundImage = backgroundImages.random() }, 4000)

	// Add some stats
	$('.privileged-groups-length').text(' ' + (tumblrDictionary.privilegedAdjective.length * tumblrDictionary.privilegedNoun.length) + ' ')
	$('.marginalized-groups-length').text(' ' + (tumblrDictionary.marginalized.noun.concept.length * tumblrDictionary.marginalized.verb.concept.length + tumblrDictionary.marginalized.noun.person.length * tumblrDictionary.marginalized.verb.person.length) + ' ')

	$('#argument').removeClass('loading')

	renderWar()

	$('.controls button.generate-insult').click(function () {
		renderInsult()
		updateBackground()
	})
	$('.controls button.generate-war').click(function () {
		renderWar()
		updateBackground()
	})
})
