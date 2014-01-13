tumblr.generators.personalities = function (prefixes, postfixes) {
	var result = []

	$.each(prefixes, function (i, pre) {
		$.each(postfixes, function (i, post) {
			result.push(pre + ' ' + post)
		})
	})

	return result
}

tumblr.generators.phobias = function () {
	var result = [],
	    phobias = [
		    'bi',
		    'curvy',
		    'deathfat',
		    'ethno',
		    'fat',
		    'furry',
		    'homo',
		    'otherkin',
		    'queer',
		    'trans*',
		    'womyn',
	    ]

	$.each(phobias, function (i, phobia) {
		result.push(phobia + 'phobic')
	})

	return result
}

tumblr.generators.alignments = function () {
	var result = [],
	    groups = [
		    {
			    pre: [
				    'dandy',
				    'demi',
				    'gender',
			    ],
			    post: [
				    'amorous',
				    'femme',
				    'fluid',
				    'fuck',
				    'queer',
			    ],
		    },
		    {
			    pre: [
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
			    post: [
				    'ethnic',
				    'gender',
				    'queer',
				    'racial',
				    'romantic',
				    'sexual',
				    'species',
			    ],
		    }
	    ]

	$.each(groups, function (i, group) {
		$.each(group.pre, function (i, pre) {
			$.each(group.post, function (i, post) {
				result.push(pre + post)
			})
		})
	})

	return result
}

tumblr.generators.kins = function () {
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
}
