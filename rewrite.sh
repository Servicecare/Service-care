export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --env-filter '
OLD_EMAIL="arnob_t78@yahoo.com"
CORRECT_NAME="Bikash Yadav"
CORRECT_EMAIL="ybikash919@gmail.com"

if echo "$GIT_COMMITTER_EMAIL" | grep -iq "arnob" || echo "$GIT_AUTHOR_EMAIL" | grep -iq "arnob" || echo "$GIT_AUTHOR_NAME" | grep -iq "arnob" || echo "$GIT_COMMITTER_NAME" | grep -iq "arnob"; then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
