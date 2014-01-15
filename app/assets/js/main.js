var generateInsult,
    generateParagraph,
    generateUsername

generateInsult = function (initialInsult) {
	var insult = ''

	if (initialInsult) {
		insult += '{insults.statements}, you '

		if (Math.random() > 0.3) {
			insult += '{insults.adjectives} '
		}
		if (Math.random() > 0.3) {
			insult += '{marginalized.nouns}-{marginalized.verbs}, '
		}
	}
	else {
		insult += 'you '
	}

	insult += '{privileged.nouns}-{privileged.adjectives} {insults.nouns}'

	return insult
}

generateParagraph = function (mangleGrammar, minLength, maxRandom) {
	var paragraph = [],
	    length = Math.round((typeof minLength === 'undefined' ? 4 : minLength) + Math.random() * (typeof maxRandom === 'undefined' ? 7 : maxRandom)),
	    dist = {
		    insult: Math.round(0.2 * length),
		    statement: Math.round(0.8 * length),
	    }, i, statements

	for (i = 0; i < dist.insult; i += 1) {
		paragraph.push(generateInsult(Math.random() > 0.3) + '!')
	}

	paragraph = paragraph.concat(_.map(_.sample(tumblr.resources.statements, dist.statement), function (val) {
		if (Math.random() > 0.5) {
			return val
		}
		var text = val.slice(0, -1),
		    punc = val.slice(-1)

		// Randomly add some extra insults to statements
		return text + (' you ' + (Math.random() > 0.3 ? '{insults.adjectives} ' : '') + '{insults.nouns}') + punc
	}))

	paragraph = _.shuffle(paragraph)

	paragraph[0] = '{intros} ' + paragraph[0]

	if (Math.random() > 0.5) {
		paragraph.push('{conclusions} {insults.statements}')
	}

	return paragraph.join(' ').replaceTerms().tumblrize(mangleGrammar)
}

generateUsername = function() {
	return '{marginalized.nouns}'.randomRepeat(2, 2).replaceTerms().toLowerCase().replace(/[^a-z]/g, '')
}

$(document).ready(function () {
	var currentBackgroundImage = tumblr.resources.images.backgrounds.random(),
	    renderInsult,
	    renderWar,
	    updateBackground

	renderInsult = function () {
		var insult = $('<p>').text(generateInsult(true).replaceTerms().tumblrize($('#tumblrize-grammar').prop('checked')).toUpperCase())

		$('#argument').empty().append(insult).attr('class', 'insult')
	}

	renderWar = function () {
		var mangleGrammar = $('#tumblrize-grammar').prop('checked'),
		    numReplies = $('#num-replies').val(),
		    war = $('<p/>').text(generateParagraph(mangleGrammar)),
		    i, username, blockquote, reply

		for (i = 0; i < numReplies; i += 1) {
			username = $('<p/>').text(generateUsername() + ':').attr('class', 'username')
			blockquote = $('<blockquote/>').append(war)
			reply = $('<p/>').text(Math.random() > 0.6 ? generateParagraph($('#tumblrize-grammar').prop('checked'), 4, 1) : generateInsult(true).replaceTerms().tumblrize(mangleGrammar).toUpperCase())

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
	window.setInterval(function () { currentBackgroundImage = tumblr.resources.images.backgrounds.random() }, 4000)

	// Add some stats
	$('.privileged-groups-length').text(' ' + (tumblr.resources.privileged.adjectives.length * tumblr.resources.privileged.nouns.length) + ' ')
	$('.marginalized-groups-length').text(' ' + (tumblr.resources.marginalized.nouns.length * tumblr.resources.marginalized.verbs.length) + ' ')

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
