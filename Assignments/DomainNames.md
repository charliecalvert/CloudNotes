# Domain Names

- Go to GoDaddy.
- Buy two one dollar, one year, domain names.
- Point one at yourname.github.io.
- The other at your elastic ip on AWS.

## Pricing

The .work domains are cheap.

![One Year](https://drive.google.com/uc?id=0B25UTAlOfPRGVWtzamdCaWI5TFE)

![Ten Year](https://drive.google.com/uc?id=0B25UTAlOfPRGdHlwcDcyY3VJOG8)
          

## Turn it in

Turn in screenshots of your domain names in the browser.
A text file showing a run of whois from the command line in Linux. Be sure to include the sections that read:

- Domain Name
- Registrar
- Sponsoring Registrar
- Whois Server
- Referral URL
- Name Server

Submit your domain names linked to a default home page (index.html) that reads:

- My Isis322 Domain Name
- The shows an image stored on Flickr.

* * *

## Domain Names on EC2

Go to Godaddy and manage your domain. On the **DNS Zone File Page** set the A record to your elastic IP.

*   [http://stackoverflow.com/a/17569106/253576](http://stackoverflow.com/a/17569106/253576)

    ## Domain Names on GitHub IO

Create a CNAME document in the root of your repository. Mine looks like this:

    www.ccalvert.net

That's the entire contents of the file, with the text flush left

On GitHub, go to setings. Look for the section on your GitHub pages.

That's the total contents of the file.

Go to your GoDaddy account.

Go to the domain page.

Choose to manage your domain.

In the DNS zone file page, set the CNAME alias for www to:

    username@github.io

