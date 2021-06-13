export const monitorFilesInput = (e, setFiles, seed, maxsize, limit) => {
	function nullandvoid(e) {
		e.target.value = null;
		seed.images
			? setFiles({ ...seed, images: [] })
			: setFiles({ ...seed, certifications: [] });
	}

	const Files = e.target.files;
	if (Files.length > limit) {
		alert(`You can only upload a maximum of ${limit} Files `);
		nullandvoid(e);
	} else {
		for (let file = 0; file < Files.length; file++) {
			if (Files[file].size > maxsize) {
				alert(
					`You have selected  a big file size exceeding the maximum limit size ${
						maxsize / 1000000
					}MB`
				);
				nullandvoid(e);
				break;
			}
			if (file + 1 === Files.length) {
				seed.images
					? setFiles({ ...seed, images: Files })
					: setFiles({ ...seed, certifications: Files });
			}
		}
	}
};

export const monitorAFileInput = (e, setFile, seed, maxsize) => {
	const Files = e.target.files;
	const name = e.target.name;
	if (Files[0].size > maxsize) {
		alert(
			`You have selected  a big file size exceeding the maximum limit size ${
				maxsize / 1000000
			}MB `
		);
		e.target.value = null;
		name === 'resume'
			? setFile({ ...seed, resume: [] })
			: setFile({ ...seed, profile: [] });

		return;
	}
	name === 'resume'
		? setFile({ ...seed, resume: Files })
		: setFile({ ...seed, profile: Files });
};
