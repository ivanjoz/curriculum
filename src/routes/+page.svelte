<script lang="ts">
	import { browser } from '$app/environment';
	import ImagePlaceholder from '../components/ImagePlaceholder.svelte';
	import Spinner from '../components/Spinner.svelte';
	import SvgImage from '../components/SvgImage.svelte';
	import {
		diaHabitual,
		experienciaAdicional,
		foda,
		mainContent,
		skills,
		socialNetworks,
		studies,
		technologies,
		ultimosProyectos,
		workExperience,
	} from '../content';
	import { getContent, parseYear, type IContent } from '../helpers';
	import iconEmail from '../images/email-icon.svg?raw';
	import iconLocation from '../images/icon-location.svg?raw';
	import style from '../styles/main.module.css';

	const yearInicio = 17;
	const yearFin = 24;
	const years = Array.from({ length: yearFin - yearInicio + 1 }, (_, index) => yearInicio + index);
	const placeholderProfile = '/images/profile-placeholder.webp';
	const siteUrl = 'https://ivan.un.pe/';
	const pageTitle = 'Iván J. Angulo Reyna | Full Stack Developer Go, Node.js, React, AWS';
	const pageDescription =
		'CV y portafolio de Iván J. Angulo Reyna, Full Stack Developer en Perú especializado en Go, Node.js, React, AWS, PostgreSQL y sistemas cloud.';
	const profileImageUrl = 'https://ivan.un.pe/images/ivan-angulo-profile.jpg';
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Iván J. Angulo Reyna',
		alternateName: 'Ivan J. Angulo',
		jobTitle: 'Full Stack Developer',
		url: siteUrl,
		email: 'mailto:ivan@un.pe',
		image: profileImageUrl,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Trujillo',
			addressCountry: 'PE'
		},
		knowsAbout: [
			'Go',
			'Node.js',
			'React',
			'TypeScript',
			'AWS',
			'PostgreSQL',
			'DynamoDB',
			'Cloud architecture'
		],
		sameAs: socialNetworks.map((network) => network.url)
	}).replace(/</g, '\\u003c');
	const jsonLdScript = `<script type="application/ld+json">${jsonLd}</` + 'script>';

	let startDownloadPDF = false;
	let iframeSrc = '';

	function barHeight(yearPoint?: number[]) {
		if (!yearPoint) return 0;

		let height = (yearPoint[1] - 1) * 2;
		if (height < 3) height = 3;
		if (height > 18) height = 18;

		return height;
	}

	function startDownload(event: MouseEvent) {
		event.stopPropagation();
		if (!browser || startDownloadPDF) return;

		localStorage.removeItem('b64Pdf');
		startDownloadPDF = true;
		iframeSrc = `${window.location.origin}/pdf/?accion=download`;

		const downloadWait = window.setInterval(() => {
			let b64Pdf = localStorage.getItem('b64Pdf');
			if (!b64Pdf) return;

			localStorage.removeItem('b64Pdf');
			b64Pdf = atob(b64Pdf.split('base64,')[1]);

			const pdfArray = new Uint8Array(b64Pdf.length);
			for (let index = 0; index < b64Pdf.length; index++) {
				pdfArray[index] = b64Pdf.charCodeAt(index);
			}

			const blob = new Blob([pdfArray], { type: 'application/pdf' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'ivan_angulo_cv.pdf';
			a.click();
			a.remove();
			URL.revokeObjectURL(url);

			window.clearInterval(downloadWait);
			startDownloadPDF = false;
		}, 50);
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href={siteUrl} />
	<meta property="og:type" content="profile" />
	<meta property="og:locale" content="es_PE" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content={profileImageUrl} />
	<meta property="og:image:alt" content="Foto de perfil de Iván J. Angulo Reyna" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={profileImageUrl} />
	{@html jsonLdScript}
</svelte:head>

<div class={style.main}>
	{@render AboutMeLayer({ cssClass: style.about_me_layer })}
	{@render AboutMeLayer({ cssClass: style.about_me_layer_inline })}

	<div class={style.content}>
		<div class="mb-3 flex justify-end">
			<button
				class="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-[#403a56] shadow-sm ring-1 ring-black/10 hover:bg-[#f7f5ff]"
				onclick={startDownload}
			>
				Descarga
			</button>
		</div>

		{#if startDownloadPDF}
			<iframe src={iframeSrc} title="Generador PDF" class="w100 hidden h-[200px]"></iframe>
			<Spinner className="card-c3">
				<div class="bold h3">Generando Documento PDF...</div>
				<div class="h5">Usando pdfmake y D3</div>
			</Spinner>
		{/if}

		<h2 class={`bold ${style.title}`}>{getContent(mainContent.tecnologias)}</h2>

		<div class={`flex w100 ${style.tecnologias_container}`}>
			<div class={style.table_main_container}>
				<table class={`w100 ${style.table_main}`}>
					<thead>
						<tr>
							<th><div></div></th>
							{#each years as year}
								<th>
									<div class={style.table_header}>{year}</div>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each technologies as technology}
							<tr>
								<td>
									<div class={style.table_cell_1}>{technology.name}</div>
								</td>
								{#each years as year}
									{@const height = barHeight(technology.years.find((point) => point[0] === year))}
									<td class={style.table_cell}>
										{#if height > 0}
											<div class="relative h-full">
												<div class={style.cell_line} style={`height: ${height}px`}></div>
											</div>
										{/if}
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class={`flex ${style.experiencia_container}`}>
				<div class={`bold h3 tt-c1 mb-06 ${style.subtitle}`}>
					{getContent(mainContent.sub1)}
				</div>
				<div class="w100 block-margin">
					{#each experienciaAdicional as item, index}
						{@render LineCard({ text: item, index })}
					{/each}
				</div>
				<div class={style.line_border}></div>
				<div class={`bold h3 tt-c1 mb-06 ${style.subtitle}`}>
					{getContent(mainContent.sub2)}
				</div>
				<table>
					<tbody>
						{#each diaHabitual as item}
							<tr>
								<td class="bold h3">{item.percent}%</td>
								<td>{getContent(item.content)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<h2 class={`bold ${style.title}`}>{getContent(mainContent.sub3)}</h2>
		<div class={`flex ${style.skill_card_container}`}>
			{#each skills as skill}
				<div class={style.skill_card}>
					<SvgImage className={style.skill_image} src={skill.icon} />
					<div class={style.skill_descrip}>{getContent(skill.desc)}</div>
				</div>
			{/each}
		</div>

		<h2 class={`bold ${style.title}`}>{getContent(mainContent.sub4)}</h2>
		<div class={style.table_card_container}>
			{#each workExperience as item}
				<div class={style.table_card}>
					<div class="flex">
						<div class={style.table_card_image_ctn}>
							{#if item.logoImg}
								<img class={style.table_card_image} alt="" src={item.logoImg} />
							{:else if item.logo}
								<SvgImage src={item.logo} className={style.table_card_image} />
							{/if}
						</div>
						<div>
							<div class="h2 bold tt-c1">{item.company}</div>
							<div>{item.role}</div>
							<div class={`bold ${style.work_year}`}>
								{parseYear(item.years[0])} - {parseYear(item.years[1])}
							</div>
						</div>
					</div>
					<div class="block-margin">
						{#each item.description as description}
							<div class="flex ai-start"><div class={style.dot_static}></div>{description}</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<h2 class={`bold ${style.title}`}>{getContent(mainContent.sub5)}</h2>
		<div class="block-margin pl-3">
			{#each ultimosProyectos as item, index}
				{@render LineCard({ text: item, index })}
			{/each}
		</div>

		<h2 class={`bold ${style.title}`}>{getContent(mainContent.sub6)}</h2>
		<div class={style.table_card_container}>
			{#each foda as item}
				<div class={`block-margin4 ${style.foda_card}`}>
					<div class="bold h5 tt-c1 w100 ta-c">{item.name}</div>
					{#each item.list as text}
						<div class="flex ai-start"><div class={style.dot_static}></div>{text}</div>
					{/each}
				</div>
			{/each}
		</div>

		<h2 class={`bold ${style.title}`}>{getContent(mainContent.sub7)}</h2>
		<div class={style.table_card_container}>
			{#each studies as item}
				<div class={style.table_card}>
					<div class="flex">
						<div class={style.table_card_image_ctn}>
							<SvgImage className={style.table_card_image} src={item.logo} />
						</div>
						<div>
							<div class="h2 bold tt-c1">{item.name}</div>
							<div>{item.carrer}</div>
							<div class={`bold ${style.work_year}`}>{item.years}</div>
						</div>
					</div>
					<div class="block-margin4">
						{#each item.content as text}
							<div class="flex ai-start"><div class={style.dot_static}></div>{text}</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

{#snippet AboutMeLayer({ cssClass }: { cssClass: string })}
	<div class={cssClass}>
		<div>
			<div class={style.photo_circle}>
				<ImagePlaceholder
					className=""
					src="/images/ivan-angulo-profile.webp"
					placeHolder={placeholderProfile}
					alt="Foto de perfil de Iván J. Angulo Reyna"
				/>
			</div>
			<div class={style.letter}>
				<h1 class={`h1 bold ${style.ivan_nombre}`}>Iván J. Angulo</h1>
			</div>
			<div class={`flex ${style.location_container}`}>
				<SvgImage
					styleText="margin-right: 3px; width: 1rem; height: 1rem"
					src={iconLocation}
					prerender={true}
				/>
				<div class={style.location}>Trujillo - Perú</div>
			</div>
		</div>
		<div>
			<div class={`${style.letter} ${style.developer}`}>
				<h2 class={`h22 bold ${style.experiencia1}`}>Software Developer FullStack</h2>
			</div>
			<div class={`${style.letter} ${style.about_me}`} style="padding: 0.7vh; text-align: center">
				{getContent(mainContent.descripcion)}
			</div>
			<div class="flex">
				{#each socialNetworks as network}
					<a
						href={network.url}
						target="_blank"
						rel="me noopener noreferrer"
						class={style.social_icon}
						aria-label={network.name}
					>
						<SvgImage src={network.icon} prerender={true} alt={network.name} />
					</a>
				{/each}
			</div>
			<div class={`flex ${style.email_icon}`}>
				<SvgImage
					src={iconEmail}
					styleText="margin-right: 6px; width: 1rem; height: 1rem"
					prerender={true}
				/>
				<div class={`h3 ${style.location}`}>
					<a href="mailto:ivan@un.pe" class={style.email}>ivan@un.pe</a>
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet LineCard({ text, index = 0 }: { text: IContent; index?: number })}
	<div class={`flex ai-start ${style.dot_container}`}>
		{#if index !== 0}
			<div class={style.dot_line}></div>
		{/if}
		<div class={style.dot}></div>
		{getContent(text)}
	</div>
{/snippet}
