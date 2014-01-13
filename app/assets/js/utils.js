Array.prototype.random = function () {
	Math.random()
	Math.random()
	Math.random()
	return this[Math.floor(Math.random() * this.length)]
}

Array.prototype.weighted = function (weights) {
	var ret = [],
	    i, j, multiples

	for (i = 0; i < weights.length; i += 1) {
		multiples = weights[i] * 10

		for (j = 0; j < multiples; j += 1) {
			ret.push(this[i])
		}
	}

	return ret
}

Object.prototype.accessProperty = function (path) {
	var obj = this,
	    arr = path.split('.')

	while (arr.length && (obj = obj[arr.shift()])) {}

	return obj
}

String.prototype.randomRepeat = function (to, from) {
	from = typeof from === 'undefined' ? 1 : from
	return (new Array(Math.floor(Math.random() * (to - from + 1) + from) + 1)).join(this)
}

String.prototype.literalize = function () {
	var text = this

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

	return text.toString()
}

String.prototype.tumblrize = function (addExtraInsults, mangleGrammar) {
	// TODO make this handle text in separate sentences (match delimiters/symbols)
	var rawText = this,
	    text = rawText.slice(0, -1),
	    punctuation = rawText.slice(-1),
	    wrap, randomPoint

	if (typeof addExtraInsults === 'undefined') {
		addExtraInsults = false
	}
	if (typeof mangleGrammar === 'undefined') {
		mangleGrammar = false
	}

	// Normalize text
	text = text.toLowerCase()

	// Randomly make stuff literal
	text = text.literalize()

	// Replace "and" with ampersand
	text = text.replace(/\band\b/g, '&')

	// Randomly add some extra insults
	if (addExtraInsults && Math.random() > 0.4 && punctuation.search(/[\!\?]/gi) !== -1) {
		text += ' you ' + tumblr.resources.randomInsult()
	}

	text += punctuation

	if (mangleGrammar) {
		// Normalize text
		text = text.toLowerCase()

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

		// Add emoji
		if (Math.random() > 0.8) {
			text += ' ' + tumblr.resources.emoji.random()
		}
	}

	// Randomly uppercase text
	if (Math.random() > 0.4) {
		text = text.toUpperCase()
	}

	// Randomly lowercase first characters
	randomPoint = Math.floor(Math.random() * (text.length / 3))
	text = text.slice(0, randomPoint).toLowerCase() + text.slice(randomPoint, text.length)

	// Randomly repeat punctuation
	text = text.replace(/([\!\?]+)/g, function (m, p1) {
		return p1.slice(0, 1).randomRepeat(10)
	})

	return text.toString()
}

String.prototype.replaceTerms = function (form) {
	var statementType = ['persons', 'concepts'].random(),
	    re = /\{([a-z\.]+)\}/gi,
	    i = 0,
	    text = this,
	    replaceTerm

	if (typeof form === 'undefined') {
		form = 1
	}

	replaceTerm = function (m, term) {
		var termDict = tumblr.resources.accessProperty(term)

		if (typeof termDict === 'function') {
			return termDict()
		}

		if (typeof termDict === 'object' && termDict.hasOwnProperty(statementType)) {
			termDict = termDict[statementType]
		}

		term = termDict.random()

		if (typeof term === 'object') {
			term = term.length === 3 ? term[form] : term.random()
		}

		return term
	}

	while (text.search(re) !== -1 && i < 5) {
		// Loop until all terms have been replaced
		// Max 5 recursions
		text = text.replace(re, replaceTerm)
		i += 1
	}

	return text.toString()
}
