tumblr.generators.personalities = function (prefixes, postfixes) {
	var result = []

	_.forEach(prefixes, function (pre) {
		_.forEach(postfixes, function (post) {
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

	_.forEach(phobias, function (phobia) {
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

	_.forEach(groups, function (group) {
		_.forEach(group.pre, function (pre) {
			_.forEach(group.post, function (post) {
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

	_.forEach(kins, function (kin) {
		result.push(kin + 'kin')
	})

	return result
}
