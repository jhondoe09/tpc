<?php

$fh = fopen('frontend\attachments\patch', 'r');

while ($line = fgets($fh)) {
?>
    <div style="min-height: 120px;">
        <div class="collapse collapse-horizontal" id="collapseWidthExample">
            <div class="card card-body" style="width: 300px;">
                <?php echo $line; ?>
            </div>
        </div>
    </div>
<?php
}
fclose($fh);
