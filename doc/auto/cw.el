(TeX-add-style-hook
 "cw"
 (lambda ()
   (setq TeX-command-extra-options
         "-shell-escape")
   (TeX-add-to-alist 'LaTeX-provided-class-options
                     '(("report" "14pt" "final")))
   (TeX-add-to-alist 'LaTeX-provided-package-options
                     '(("subook" "times" "firacode" "a4paper" "microtyping" "732" "smalltitles" "listbib")))
   (add-to-list 'LaTeX-verbatim-environments-local "minted")
   (TeX-run-style-hooks
    "latex2e"
    "report"
    "rep10"
    "subook"
    "tabularx"
    "showframe"
    "minted")
   (LaTeX-add-labels
    "chap:intro"
    "sec:struct-bd"
    "fig:crate-table"
    "fig:prog-ex"
    "eq:f1")
   (LaTeX-add-bibitems
    "bratko90"))
 :latex)

