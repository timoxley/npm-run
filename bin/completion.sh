_npmRunComplete()
{
    local cur=${COMP_WORDS[COMP_CWORD]}
    COMPREPLY=( $(compgen -W "$(ls $(npm bin))" -- $cur) )
}

complete -F _npmRunComplete npm-run
