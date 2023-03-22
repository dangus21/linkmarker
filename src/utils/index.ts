const ONE_MB_SIZE = 1048576;

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

function convertBase64(file: File | undefined): Promise<string> {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file as any);
		fileReader.onload = () => {
			resolve(String(fileReader.result));
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
}

function blobToBase64(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(blob);
		fileReader.onloadend = function () {
			const base64data = fileReader.result as string;
			resolve(base64data);
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
}

export {
	classNames,
	convertBase64,
	blobToBase64,
	ONE_MB_SIZE
};
