var generateInsult,
    generateStatement,
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

	return insult.replaceTerms()
}

generateStatement = function () {
	var statement = tumblr.resources.statements.random()

	return statement[1].replaceTerms(statement[0])
}

generateParagraph = function (mangleGrammar, minLength, maxRandom) {
	var paragraph = [],
	    length = (typeof minLength === 'undefined' ? 3 : minLength) + Math.random() * (typeof maxRandom === 'undefined' ? 7 : maxRandom),
	    sentence, i

	for (i = 0, sentence = ''; i < length; i += 1) {
		if (i === 0) {
			sentence += tumblr.resources.intros.random().tumblrize(false, mangleGrammar)
		}
		else if (Math.random() > 0.8) {
			sentence = (generateInsult(Math.random() > 0.3) + '!').tumblrize(false, mangleGrammar)
		}
		else {
			sentence = generateStatement().tumblrize(true, mangleGrammar)
		}

		paragraph.push(sentence)
	}

	if (Math.random() > 0.6) {
		paragraph.push((tumblr.resources.conclusions.random() + ' ' + tumblr.resources.insults.statements.random() + '!').replaceTerms().tumblrize(false, mangleGrammar))
	}

	return paragraph.join(' ')
}

generateUsername = function() {
	return '{marginalized.nouns.persons}'.randomRepeat(2, 2).replaceTerms().toLowerCase().replace(/[^a-z]/g, '')
}

$(document).ready(function () {
	var currentBackgroundImage = tumblr.resources.images.backgrounds.random(),
	    renderInsult,
	    renderWar,
	    updateBackground

	renderInsult = function () {
		var insult = $('<p>').text(generateInsult(true).tumblrize(false, $('#tumblrize-grammar').prop('checked')).toUpperCase())

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
			reply = $('<p/>').text(Math.random() > 0.6 ? generateParagraph($('#tumblrize-grammar').prop('checked'), 4, 1) : generateInsult(true).tumblrize(false, tumblrize).toUpperCase())

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
	$('.marginalized-groups-length').text(' ' + (tumblr.resources.marginalized.nouns.concepts.length * tumblr.resources.marginalized.verbs.concepts.length + tumblr.resources.marginalized.nouns.persons.length * tumblr.resources.marginalized.verbs.persons.length) + ' ')

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
