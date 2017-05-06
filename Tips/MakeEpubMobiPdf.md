## Downloads and Installs

KindleGen [is here](https://www.amazon.com/gp/feature.html?docId=1000765211)

tar xvfz kindlegen_linux_2.6_i386_v2_9.tar.gz


git clone git@github.com:paulfurley/markdown-to-epub-mobi.git
sudo apt install pandoc
sudo apt install texlive-latex-base
sudo apt install xzdec

make epub
make pdf
make mobi

## Fonts

I had a font error when I tried to create the PDF.

```
$ make pdf
pandoc \
    -o build/book.pdf \
    meta/title.txt \
    chapters/01_chapter_1.md \
    --toc
! Font T1/cmr/m/n/10=ecrm1000 at 10.0pt not loadable: Metric (TFM) file not fou
nd.
<to be read again>
                   relax
l.105 \fontencoding\encodingdefault\selectfont

pandoc: Error producing PDF
Makefile:41: recipe for target 'build/book.pdf' failed
make: *** [build/book.pdf] Error 43
```

To fix this, set up tlmgr:

    tlmgr init-usertree

This creates a folder: **~/texmf**

Then I can search for the missing font shown in the error message:

    tlmgr search --file ecrm1000.tfm --global

This yields:

```
ec:
    texmf-dist/fonts/tfm/jknappen/ec/ecrm1000.tfm
```

The result tells me to install **ec**:

    tlmgr install ec


https://puppet.com/blog/how-we-automated-our-ebook-builds-pandoc-and-kindlegen
http://docs.electric-cloud.com/accelerator_doc/8_1/Mobile/eMake/Advanced/Content/emake%20Guide/5_Make_Compatibility/8_Wildcard_Sort_Order.htm
