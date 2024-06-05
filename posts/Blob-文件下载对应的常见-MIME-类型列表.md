---
title: Blob 文件下载对应的常见 MIME 类型列表
tags:
- JS
- Blob
- fs
categories:
- JavaScript
abbrlink: b927f553
date: 2022-06-30 10:35:06
---

**Blob** 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 `ReadableStream` 来用于数据操作。在 JS 中通常使用 **Blob** 进行文件下载保存，`new` 转换过程中需要指定下载文件 **MIME** 类型。

![Blob && MIME](https://tiven.cn/static/img/img-js-04-dPIVRzlwMdj1V8eRB3tje.jpg)

[//]: # (<!-- more -->)

## 一、介绍

媒体类型（通常称为 **Multipurpose Internet Mail Extensions** 或 **MIME** 类型）是一种标准，用来表示文档、文件或字节流的性质和格式。它在IETF RFC 6838中进行了定义和标准化。

互联网号码分配机构（IANA）是负责跟踪所有官方 MIME 类型的官方机构，您可以在 [媒体类型](https://www.iana.org/assignments/media-types/media-types.xhtml "媒体类型") 页面中找到最新的完整列表。

## 二、常见 MIME 类型列表

**提示**：浏览器通常使用 **MIME** 类型（而不是`文件扩展名`）来确定如何处理 **URL**，因此 Web 服务器在响应头中添加正确的 **MIME** 类型非常重要。如果配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作，并且下载的文件也会被错误处理。

|扩展名|文档类型|MIME 类型|
|---|---|---|
|`.aac`|AAC audio|`audio/aac`|
|`.abw`|AbiWord document|`application/x-abiword`|
|`.arc`|Archive document (multiple files embedded)|`application/x-freearc`|
|`.avi`|AVI: Audio Video Interleave|`video/x-msvideo`|
|`.azw`|Amazon Kindle eBook format|`application/vnd.amazon.ebook`|
|`.bin`|Any kind of binary data|`application/octet-stream`|
|`.bmp`|Windows OS/2 Bitmap Graphics|`image/bmp`|
|`.bz`|BZip archive|`application/x-bzip`|
|`.bz2`|BZip2 archive|`application/x-bzip2`|
|`.csh`|C-Shell script|`application/x-csh`|
|`.css`|Cascading Style Sheets (CSS)|`text/css`|
|`.csv`|Comma-separated values (CSV)|`text/csv`|
|`.doc`|Microsoft Word|`application/msword`|
|`.docx`|Microsoft Word (OpenXML)|`application/vnd.openxmlformats-officedocument.wordprocessingml.document`|
|`.eot`|MS Embedded OpenType fonts|`application/vnd.ms-fontobject`|
|`.epub`|Electronic publication (EPUB)|`application/epub+zip`|
|`.gif`|Graphics Interchange Format (GIF)|`image/gif`|
|`.htm` `.html`|HyperText Markup Language (HTML)|`text/html`|
|`.ico`|Icon format|`image/vnd.microsoft.icon`|
|`.ics`|iCalendar format|`text/calendar`|
|`.jar`|Java Archive (JAR)|`application/java-archive`|
|`.jpeg` `.jpg`|JPEG images|`image/jpeg`|
|`.js`|JavaScript|`text/javascript`|
|`.json`|JSON format|`application/json`|
|`.jsonld`|JSON-LD format|`application/ld+json`|
|`.mid` `.midi`|Musical Instrument Digital Interface (MIDI)|`audio/midi` `audio/x-midi`|
|`.mjs`|JavaScript module|`text/javascript`|
|`.mp3`|MP3 audio|`audio/mpeg`|
|`.mpeg`|MPEG Video|`video/mpeg`|
|`.mpkg`|Apple Installer Package|`application/vnd.apple.installer+xml`|
|`.odp`|OpenDocument presentation document|`application/vnd.oasis.opendocument.presentation`|
|`.ods`|OpenDocument spreadsheet document|`application/vnd.oasis.opendocument.spreadsheet`|
|`.odt`|OpenDocument text document|`application/vnd.oasis.opendocument.text`|
|`.oga`|OGG audio|`audio/ogg`|
|`.ogv`|OGG video|`video/ogg`|
|`.ogx`|OGG|`application/ogg`|
|`.otf`|OpenType font|`font/otf`|
|`.png`|Portable Network Graphics|`image/png`|
|`.pdf`|Adobe Portable Document Format (PDF)|`application/pdf`|
|`.ppt`|Microsoft PowerPoint|`application/vnd.ms-powerpoint`|
|`.pptx`|Microsoft PowerPoint (OpenXML)|`application/vnd.openxmlformats-officedocument.presentationml.presentation`|
|`.rar`|RAR archive|`application/x-rar-compressed`|
|`.rtf`|Rich Text Format (RTF)|`application/rtf`|
|`.sh`|Bourne shell script|`application/x-sh`|
|`.svg`|Scalable Vector Graphics (SVG)|`image/svg+xml`|
|`.swf`|Small web format (SWF) or Adobe Flash document|`application/x-shockwave-flash`|
|`.tar`|Tape Archive (TAR)|`application/x-tar`|
|`.tif` `.tiff`|Tagged Image File Format (TIFF)|`image/tiff`|
|`.ttf`|TrueType Font|`font/ttf`|
|`.txt`|Text, (generally ASCII or ISO 8859-n)|`text/plain`|
|`.vsd`|Microsoft Visio|`application/vnd.visio`|
|`.wav`|Waveform Audio Format|`audio/wav`|
|`.weba`|WEBM audio|`audio/webm`|
|`.webm`|WEBM video|`video/webm`|
|`.webp`|WEBP image|`image/webp`|
|`.woff`|Web Open Font Format (WOFF)|`font/woff`|
|`.woff2`|Web Open Font Format (WOFF)|`font/woff2`|
|`.xhtml`|XHTML|`application/xhtml+xml`|
|`.xls`|Microsoft Excel|`application/vnd.ms-excel`|
|`.xlsx`|Microsoft Excel (OpenXML)|`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`|
|`.xml`|XML|`application/xml 代码对普通用户来说不可读 (RFC 3023, section 3) text/xml 代码对普通用户来说可读 (RFC 3023, section 3)`|
|`.xul`|XUL|`application/vnd.mozilla.xul+xml`|
|`.zip`|ZIP archive|`application/zip`|
|`.3gp`|3GPP audio/video container|`video/3gpp audio/3gpp（若不含视频）`|
|`.3g2`|3GPP2 audio/video container|`video/3gpp2 audio/3gpp2（若不含视频）`|
|`.7z`|7-zip archive|`application/x-7z-compressed`|

参考文档：
* https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
* https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_Types
* https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

---

欢迎访问：[天问博客](https://tiven.cn/p/b927f553/ "天问博客-专注于大前端技术")
