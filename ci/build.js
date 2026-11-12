
import { join } from '@std/path'
import { create, clean, isDir } from './utils/fs.js'
import config from './utils/config.js'

// recursively copy non-html files
const copy = async (source, target) => {
	await create(target)

	for await (const file of Deno.readDir(source)) {
		if(file.isFile && !file.name.endsWith('.html')) {
			await Deno.copyFile(join(source, file.name), join(target, file.name))
		}
		else if(file.isDirectory) {
			await create(join(target, file.name))
			await copy(join(source, file.name), join(target, file.name))
		}
	}
}

const copyFile = async (source, target) => await Deno.copyFile(source, target)

// copy the HTML files and update links to media with the version
const versionHtml = async (source, target, version) => {
	for await (const file of Deno.readDir(source)) {
		if(file.isFile && file.name.endsWith('.html')) {
			const text = await Deno.readTextFile(join(source, file.name))
			const converted = text
				.replace(/href="\/css/g, `href="/${version}/css`)
				.replace(/"\.\/js/g, `"./${version}/js`)
				.replace(/"\.\.\/js/g, `"../${version}/js`)
				.replace(/"\/js/g, `"/${version}/js`)

			await Deno.writeTextFile(join(target, file.name), converted)
		}
	}
}

const versionServiceWorker = async (source, target, version) => {
	const text = await Deno.readTextFile(source)
	const converted = text
		.replace(/'\/css\//g, `'/${version}/css/`)
		.replace(/'\/js\//g, `'/${version}/js/`)
		.replace('~VERSION~', version)

	await Deno.writeTextFile(target, converted)
}

const version = config.Version

// directories we're working with
const source = join(Deno.cwd(), 'src')
const dist = join(Deno.cwd(), 'dist')
const distVersioned = join(dist, version)

// remove and recreate the dist directory
await clean(dist)
await create(distVersioned)

// copy media files, dir by dir
const mediaDirs = ['css', 'js']

await Promise.all(mediaDirs.map(dir => copy(join(source, dir), join(distVersioned, dir))))

// copy images to dist
await copy(join(source, 'media'), join(dist, 'media'))

// copy and update HTML
await versionHtml(source, dist, version)
await create(join(dist, 'about'))
await versionHtml(join(source, 'about'), join(dist, 'about'), version)

// copy and update sw.js
await versionServiceWorker(join(source, 'sw.js'), join(dist, 'sw.js'), version)

// copy other files from root dir
const rootFiles = ['manifest.json']

await Promise.all(rootFiles.map(file => copyFile(join(source, file), join(dist, file)))) 

console.log('Done')
