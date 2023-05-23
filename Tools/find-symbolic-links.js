#!/usr/bin/env node

import { walkSimple } from "walk-directories";

const no = walkSimple({ path: process.env.CLOUDNOTES, ext: ".md" });