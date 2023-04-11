<div id="top"></div>
<!--
*** This README was created with https://github.com/othneildrew/Best-README-Template
-->



<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Lenra's website</h3>

  <p align="center">
    The Lenra's project presentation website.
    <br />
    <br />
    <a href="https://github.com/lenra-io/website/issues">Report Bug</a>
    ·
    <a href="https://github.com/lenra-io/website/issues">Request Feature</a>
  </p>
</div>

This project uses the [Lesta framework](https://github.com/lenra-io/lesta).


<!-- GETTING STARTED -->

## Getting started

You can run this project from the [Docker image](https://hub.docker.com/r/lenra/website):
```console
docker run --rm -it -p 8080:8080 lenra/website
```

Or you can run it with NodeJS:
```console
npm i
npm start
```

The website will be available at http://localhost:8080/

To run it locally with the [Ghorgamel](https://github.com/lenra-io/ghorgamel) integration (requires [Dofigen](https://github.com/lenra-io/dofigen)):
```console
dofigen dofigen.yml
docker-compose build
docker-compose up -d
```

It is recommended to define the `GITHUB_TOKEN` with a [GitHub personnal access token](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) in a `.env` file avoid GitHub API limitations.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please open an issue with the tag "enhancement".
Don't forget to give the project a star if you liked it! Thanks again!

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the **MIT** License. See [LICENSE](./LICENSE) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Lenra - [@lenra_dev](https://twitter.com/lenra_dev) - contact@lenra.io

Project Link: [https://github.com/lenra-io/website](https://github.com/lenra-io/website)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lenra-io/website.svg?style=for-the-badge
[contributors-url]: https://github.com/lenra-io/website/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lenra-io/website.svg?style=for-the-badge
[forks-url]: https://github.com/lenra-io/website/network/members
[stars-shield]: https://img.shields.io/github/stars/lenra-io/website.svg?style=for-the-badge
[stars-url]: https://github.com/lenra-io/website/stargazers
[issues-shield]: https://img.shields.io/github/issues/lenra-io/website.svg?style=for-the-badge
[issues-url]: https://github.com/lenra-io/website/issues
[license-shield]: https://img.shields.io/github/license/lenra-io/website.svg?style=for-the-badge
[license-url]: https://github.com/lenra-io/website/blob/master/LICENSE
